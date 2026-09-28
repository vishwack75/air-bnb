import mongoose, { Schema, Document } from 'mongoose';
import { IListing } from '../types';

export interface ListingDocument extends Omit<IListing, '_id'>, Document {}

const AmenitySchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String },
  },
  { _id: false }
);

const HostSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    isSuperhost: { type: Boolean, default: true },
    joinedDate: { type: String, required: true },
    responseRate: { type: Number, default: 100 },
    responseTime: { type: String, default: 'within an hour' },
  },
  { _id: false }
);

const ListingSchema = new Schema<ListingDocument>(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    city: { type: String, required: true, index: true },
    country: { type: String, required: true, index: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    propertyType: { type: String, required: true, index: true },
    description: { type: String, required: true },
    host: { type: HostSchema, required: true },
    guests: { type: Number, required: true, default: 1 },
    bedrooms: { type: Number, required: true, default: 1 },
    beds: { type: Number, required: true, default: 1 },
    bathrooms: { type: Number, required: true, default: 1 },
    amenities: [AmenitySchema],
    images: [{ type: String, required: true }],
    rating: { type: Number, default: 4.95, index: true },
    reviewCount: { type: Number, default: 0 },
    pricePerNight: { type: Number, required: true, index: true },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

ListingSchema.index({ city: 1, country: 1 });
ListingSchema.index({ pricePerNight: 1, rating: -1 });
ListingSchema.index({ propertyType: 1, guests: 1 });

export const Listing = mongoose.model<ListingDocument>('Listing', ListingSchema);
