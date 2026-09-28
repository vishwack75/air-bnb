import { Request } from 'express';
import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

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
  _id: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  _id: Types.ObjectId;
  listing: Types.ObjectId;
  user?: Types.ObjectId;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: PaginationMeta;
  errors?: any[];
}
