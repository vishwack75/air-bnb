import { Listing, ListingDocument } from '../models/Listing';
import { ListingQueryInput } from '../validators/listingValidator';
import { PaginationMeta } from '../types';

export class ListingRepository {
  async findById(id: string): Promise<ListingDocument | null> {
    return Listing.findById(id).exec();
  }

  async findAll(query: ListingQueryInput): Promise<{ listings: ListingDocument[]; pagination: PaginationMeta }> {
    const filter: Record<string, any> = {};

    if (query.city) {
      filter.city = { $regex: query.city, $options: 'i' };
    }
    if (query.country) {
      filter.country = { $regex: query.country, $options: 'i' };
    }
    if (query.propertyType) {
      filter.propertyType = { $regex: query.propertyType, $options: 'i' };
    }
    if (query.guests) {
      filter.guests = { $gte: query.guests };
    }
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter.pricePerNight = {};
      if (query.minPrice !== undefined) filter.pricePerNight.$gte = query.minPrice;
      if (query.maxPrice !== undefined) filter.pricePerNight.$lte = query.maxPrice;
    }
    if (query.minRating !== undefined) {
      filter.rating = { $gte: query.minRating };
    }

    const sortOption: Record<string, 1 | -1> = {};
    if (query.sort === 'price_asc') sortOption.pricePerNight = 1;
    else if (query.sort === 'price_desc') sortOption.pricePerNight = -1;
    else if (query.sort === 'rating_desc') sortOption.rating = -1;
    else sortOption.createdAt = -1;

    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [listings, total] = await Promise.all([
      Listing.find(filter).sort(sortOption).skip(skip).limit(limit).exec(),
      Listing.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      listings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async create(data: Partial<ListingDocument>): Promise<ListingDocument> {
    return Listing.create(data);
  }

  async update(id: string, data: Partial<ListingDocument>): Promise<ListingDocument | null> {
    return Listing.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<ListingDocument | null> {
    return Listing.findByIdAndDelete(id).exec();
  }

  async updateRatingAndCount(id: string, newRating: number, newCount: number): Promise<void> {
    await Listing.findByIdAndUpdate(id, {
      rating: newRating,
      reviewCount: newCount,
    }).exec();
  }

  async getDistinctCities(): Promise<{ city: string; country: string; count: number }[]> {
    return Listing.aggregate([
      { $group: { _id: { city: '$city', country: '$country' }, count: { $sum: 1 } } },
      { $project: { _id: 0, city: '$_id.city', country: '$_id.country', count: 1 } },
      { $sort: { count: -1 } },
    ]);
  }
}

export const listingRepository = new ListingRepository();
