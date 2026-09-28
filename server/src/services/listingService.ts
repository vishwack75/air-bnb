import { listingRepository } from '../repositories/listingRepository';
import { CreateListingInput, UpdateListingInput, ListingQueryInput } from '../validators/listingValidator';
import { ApiError } from '../utils/apiError';

export class ListingService {
  async getListings(query: ListingQueryInput) {
    return listingRepository.findAll(query);
  }

  async getListingById(id: string) {
    const listing = await listingRepository.findById(id);
    if (!listing) {
      throw new ApiError(404, 'Listing not found');
    }
    return listing;
  }

  async createListing(input: CreateListingInput) {
    return listingRepository.create(input);
  }

  async updateListing(id: string, input: UpdateListingInput) {
    const listing = await listingRepository.update(id, input);
    if (!listing) {
      throw new ApiError(404, 'Listing not found');
    }
    return listing;
  }

  async deleteListing(id: string) {
    const listing = await listingRepository.delete(id);
    if (!listing) {
      throw new ApiError(404, 'Listing not found');
    }
    return listing;
  }
}

export const listingService = new ListingService();
