export interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  joinedDate: string;
  responseRate?: number;
  responseTime?: string;
}

export interface Amenity {
  name: string;
  category: string;
  icon: string;
  description?: string;
}

export interface Listing {
  _id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  description: string;
  host: Host;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: Amenity[];
  images: string[];
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  available: boolean;
  isGuestFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListingQueryParams {
  city?: string;
  country?: string;
  propertyType?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  page?: number;
  limit?: number;
  sort?: 'price_asc' | 'price_desc' | 'rating_desc' | 'newest';
}
