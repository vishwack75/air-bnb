import { z } from 'zod';

export const createListingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  location: z.string().min(2, 'Location is required'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  latitude: z.number(),
  longitude: z.number(),
  propertyType: z.string().min(2, 'Property type is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  host: z.object({
    name: z.string().min(2),
    avatar: z.string().url(),
    isSuperhost: z.boolean().default(true),
    joinedDate: z.string().default('2020'),
    responseRate: z.number().optional(),
    responseTime: z.string().optional(),
  }),
  guests: z.number().int().positive(),
  bedrooms: z.number().int().nonnegative(),
  beds: z.number().int().nonnegative(),
  bathrooms: z.number().nonnegative(),
  amenities: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      icon: z.string(),
      description: z.string().optional(),
    })
  ).default([]),
  images: z.array(z.string().url()).min(1, 'At least 1 image is required'),
  pricePerNight: z.number().positive(),
  cleaningFee: z.number().nonnegative().default(0),
  serviceFee: z.number().nonnegative().default(0),
  available: z.boolean().default(true),
});

export const updateListingSchema = createListingSchema.partial();

export const listingQuerySchema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  propertyType: z.string().optional(),
  guests: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  sort: z.enum(['price_asc', 'price_desc', 'rating_desc', 'newest']).default('newest'),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type ListingQueryInput = z.infer<typeof listingQuerySchema>;
