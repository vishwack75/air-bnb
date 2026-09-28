export interface IHost {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  joinedDate: string;
  responseRate?: number;
  responseTime?: string;
}

export interface IAmenity {
  name: string;
  category: string;
  icon: string;
  description?: string;
}

export interface IListing {
  _id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  description: string;
  host: IHost;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: IAmenity[];
  images: string[];
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  _id: string;
  listing: string;
  user?: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errors?: any[];
}
