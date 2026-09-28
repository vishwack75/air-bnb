import { Request, Response } from 'express';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { Amenity } from '../models/Amenity';

export const defaultAmenities = [
  { name: 'Mountain view', category: 'Views', icon: 'Mountain', description: 'Breathtaking view of surrounding mountain peaks' },
  { name: 'Wifi', category: 'Internet and office', icon: 'Wifi', description: 'Fast Wi-Fi (50+ Mbps)' },
  { name: 'Dedicated workspace', category: 'Internet and office', icon: 'Laptop', description: 'A room or desk space suitable for working' },
  { name: 'Free parking on premises', category: 'Parking and facilities', icon: 'Car', description: 'Private parking spot' },
  { name: 'Private hot tub', category: 'Facilities', icon: 'Bath', description: 'Available all year round' },
  { name: 'Kitchen', category: 'Kitchen and dining', icon: 'Utensils', description: 'Space where guests can cook their own meals' },
  { name: 'Patio or balcony', category: 'Outdoor', icon: 'Sun', description: 'Outdoor relaxation seating' },
  { name: 'Fireplace', category: 'Heating and cooling', icon: 'Flame', description: 'Indoor wood burning fireplace' },
  { name: 'TV', category: 'Entertainment', icon: 'Tv', description: 'HDTV with Netflix and Apple TV' },
  { name: 'Air conditioning', category: 'Heating and cooling', icon: 'Wind', description: 'Climate control system' },
];

export const getAmenities = asyncHandler(async (_req: Request, res: Response) => {
  const amenities = await Amenity.find().exec();
  if (!amenities || amenities.length === 0) {
    return sendResponse(res, 200, defaultAmenities);
  }
  return sendResponse(res, 200, amenities);
});
