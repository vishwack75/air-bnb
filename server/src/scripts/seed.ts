import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Listing } from '../models/Listing';
import { Review } from '../models/Review';
import { Amenity } from '../models/Amenity';
import { config } from '../config/env';

const sampleAmenities = [
  { name: 'Mountain view', category: 'Scenic views', icon: 'Mountain', description: 'Unobstructed mountain view' },
  { name: 'Valley view', category: 'Scenic views', icon: 'Sun', description: 'Panoramic valley view' },
  { name: 'Fast Wifi', category: 'Internet and office', icon: 'Wifi', description: '500 Mbps speed test verified' },
  { name: 'Dedicated workspace', category: 'Internet and office', icon: 'Laptop', description: 'Ergonomic chair & desk' },
  { name: 'Free parking on premises', category: 'Parking and facilities', icon: 'Car', description: '2 space private driveway' },
  { name: 'Private hot tub', category: 'Bathroom & Facilities', icon: 'Bath', description: 'Heated outdoor cedar hot tub' },
  { name: 'Chef Kitchen', category: 'Kitchen and dining', icon: 'Utensils', description: 'Fully equipped kitchen with Viking appliances' },
  { name: 'Patio or balcony', category: 'Outdoor', icon: 'Sun', description: 'Private deck with outdoor lounge chairs' },
  { name: 'Indoor fireplace', category: 'Heating and cooling', icon: 'Flame', description: 'Wood-burning fireplace with logs provided' },
  { name: 'HDTV with Netflix', category: 'Entertainment', icon: 'Tv', description: '65 inch 4K OLED TV' },
  { name: 'Central air conditioning', category: 'Heating and cooling', icon: 'Wind', description: 'Dual-zone climate control' },
  { name: 'Washer & Dryer', category: 'Bedroom and laundry', icon: 'Shirt', description: 'In-unit high efficiency washer and dryer' },
  { name: 'EV Charger', category: 'Parking and facilities', icon: 'Zap', description: 'Level 2 Tesla EV charger' },
  { name: 'Self check-in', category: 'Services', icon: 'Key', description: 'Keypad smart lock' },
];

const puneListings = [
  {
    title: 'Flat in Pashan',
    location: 'Pashan, Pune, Maharashtra, India',
    city: 'Pune',
    country: 'India',
    latitude: 18.5416,
    longitude: 73.7924,
    propertyType: 'Entire rental unit',
    description: 'Charming modern flat in Pashan with peaceful greenery, high-speed WiFi, spacious balcony, and designer living interiors.',
    host: {
      name: 'Rohan Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Superhost · 5 years hosting',
      responseRate: 100,
      responseTime: 'within an hour',
    },
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: sampleAmenities,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.96,
    reviewCount: 42,
    pricePerNight: 4087,
    cleaningFee: 500,
    serviceFee: 300,
    available: true,
    isGuestFavorite: true,
  },
  {
    title: 'Flat in Wadgaon Sheri',
    location: 'Wadgaon Sheri, Pune, Maharashtra, India',
    city: 'Pune',
    country: 'India',
    latitude: 18.5529,
    longitude: 73.9242,
    propertyType: 'Entire apartment',
    description: 'Stylish 1BHK apartment near IT parks with minimal boho decor, fully functional kitchen, and private parking space.',
    host: {
      name: 'Priya Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Superhost · 4 years hosting',
      responseRate: 98,
      responseTime: 'within an hour',
    },
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: sampleAmenities,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.93,
    reviewCount: 35,
    pricePerNight: 5136,
    cleaningFee: 600,
    serviceFee: 400,
    available: true,
    isGuestFavorite: true,
  },
  {
    title: 'Flat in Viman Nagar',
    location: 'Viman Nagar, Pune, Maharashtra, India',
    city: 'Pune',
    country: 'India',
    latitude: 18.5679,
    longitude: 73.9143,
    propertyType: 'Entire rental unit',
    description: 'Sunlit modern flat steps away from Phoenix Marketcity Mall with high-speed WiFi, smart TV, and mountain sunrise views.',
    host: {
      name: 'Aarav Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Superhost · 6 years hosting',
      responseRate: 100,
      responseTime: 'within an hour',
    },
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: sampleAmenities,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.96,
    reviewCount: 58,
    pricePerNight: 5250,
    cleaningFee: 700,
    serviceFee: 450,
    available: true,
    isGuestFavorite: true,
  },
  {
    title: 'Flat in Viman Nagar East',
    location: 'Viman Nagar, Pune, Maharashtra, India',
    city: 'Pune',
    country: 'India',
    latitude: 18.5699,
    longitude: 73.9183,
    propertyType: 'Luxury penthouse',
    description: 'Ultra-luxurious duplex penthouse with private rooftop infinity pool, smart home automation, and 360-degree city views.',
    host: {
      name: 'Vikram Joshi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Superhost · 3 years hosting',
      responseRate: 99,
      responseTime: 'within a few hours',
    },
    guests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 3,
    amenities: sampleAmenities,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.89,
    reviewCount: 29,
    pricePerNight: 10000,
    cleaningFee: 1200,
    serviceFee: 800,
    available: true,
    isGuestFavorite: false,
  },
  {
    title: 'Hotel in Wakad',
    location: 'Wakad, Pune, Maharashtra, India',
    city: 'Pune',
    country: 'India',
    latitude: 18.5987,
    longitude: 73.7688,
    propertyType: 'Boutique hotel room',
    description: 'Serene resort-style hotel suite featuring an outdoor swimming pool, complimentary buffet breakfast, and lush tropical gardens.',
    host: {
      name: 'Ananya Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      isSuperhost: false,
      joinedDate: '2 years hosting',
      responseRate: 95,
      responseTime: 'within an hour',
    },
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: sampleAmenities,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.88,
    reviewCount: 64,
    pricePerNight: 3390,
    cleaningFee: 300,
    serviceFee: 250,
    available: true,
    isGuestFavorite: false,
  },
  {
    title: 'Flat in Viman Nagar North',
    location: 'Viman Nagar, Pune, Maharashtra, India',
    city: 'Pune',
    country: 'India',
    latitude: 18.571,
    longitude: 73.916,
    propertyType: 'Entire luxury apartment',
    description: 'Flawless 5-star rated designer apartment with floor-to-ceiling glass windows, high-speed fiber internet, and espresso bar.',
    host: {
      name: 'Eleanor Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Superhost · 7 years hosting',
      responseRate: 100,
      responseTime: 'within an hour',
    },
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: sampleAmenities,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 5.0,
    reviewCount: 88,
    pricePerNight: 7760,
    cleaningFee: 800,
    serviceFee: 500,
    available: true,
    isGuestFavorite: true,
  },
  {
    title: 'Flat in Wadgaon Sheri South',
    location: 'Wadgaon Sheri, Pune, Maharashtra, India',
    city: 'Pune',
    country: 'India',
    latitude: 18.55,
    longitude: 73.92,
    propertyType: 'Entire apartment',
    description: 'Cozy and quiet top-floor apartment with panoramic sunset view, wooden floors, and full kitchen facilities.',
    host: {
      name: 'Neha Kapoor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Superhost · 4 years hosting',
      responseRate: 99,
      responseTime: 'within an hour',
    },
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    amenities: sampleAmenities,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.99,
    reviewCount: 51,
    pricePerNight: 4577,
    cleaningFee: 500,
    serviceFee: 350,
    available: true,
    isGuestFavorite: true,
  },
];

const sampleReviews = [
  {
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Absolutely breathtaking! The photos do not even do it justice. Sitting on the balcony during sunset was pure magic. Thoughtful hosts!',
    createdAt: new Date('2025-08-15'),
  },
  {
    authorName: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'High-speed internet made remote work effortless, and the neighborhood is so peaceful and safe.',
    createdAt: new Date('2025-07-22'),
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Listing.deleteMany({});
    await Review.deleteMany({});
    await Amenity.deleteMany({});

    console.log('Cleared old database records.');

    await Amenity.insertMany(sampleAmenities);
    console.log('Seeded amenities.');

    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await User.create({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      passwordHash,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    });
    console.log(`Seeded demo user: ${user.email} (password: password123)`);

    const createdListings = await Listing.insertMany(puneListings);
    console.log(`Seeded ${createdListings.length} Pune listings!`);

    const reviewsWithListing = sampleReviews.map((r) => ({
      ...r,
      listing: createdListings[0]._id,
      user: user._id,
    }));

    await Review.insertMany(reviewsWithListing);
    console.log(`Seeded reviews for main listing.`);

    console.log('=================================');
    console.log('🎉 Database seeding completed successfully!');
    console.log('=================================');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
