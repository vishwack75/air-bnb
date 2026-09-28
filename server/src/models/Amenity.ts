import mongoose, { Schema, Document } from 'mongoose';
import { IAmenity } from '../types';

export interface AmenityDocument extends IAmenity, Document {}

const AmenitySchema = new Schema<AmenityDocument>({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String },
});

export const Amenity = mongoose.model<AmenityDocument>('Amenity', AmenitySchema);
