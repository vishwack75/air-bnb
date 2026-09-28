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

const sampleListing = {
  title: 'Luxury Architectural Glass Cabin with Hot Tub & Mountain Views',
  location: 'Aspen, Colorado, United States',
  city: 'Aspen',
  country: 'United States',
  latitude: 39.1911,
  longitude: -106.8175,
  propertyType: 'Entire cabin',
  description: `Welcome to The Alpine Solitude Glass Cabin — a sanctuary of modern luxury nestled high in the Rockies. 

Designed by award-winning architects, this striking retreat features floor-to-ceiling glass walls that frame panoramic mountain views, a custom cedar hot tub on a cantilevered deck, and an open-concept living area centered around a suspended steel fireplace.

### The Space
- **Living Room**: Soaring 18-foot timber ceilings, Scandinavian furnishings, custom wool rugs, and an immersive sound system.
- **Master Suite**: King-size Tempur-Pedic mattress with organic Belgian linen sheets and private access to the outdoor stargazing deck.
- **Gourmet Kitchen**: Custom walnut cabinetry, Marble island, Miele appliances, and a Pour-Over Coffee Station stocked with locally roasted single-origin beans.
- **Spa Bath**: Freestanding soaking tub overlooking the pine forest, rain shower, and heated terrazzo tile floors.

Whether you're sipping morning espresso as sunrise paints the peaks pink or soaking in the hot tub under brilliant starry skies, every moment here is designed for peace and renewal.`,
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
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
  ],
  rating: 4.98,
  reviewCount: 38,
  pricePerNight: 485,
  cleaningFee: 120,
  serviceFee: 65,
  available: true,
};

const sampleReviews = [
  {
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Absolutely breathtaking! The photos do not even do it justice. Sitting in the cedar hot tub while snowflakes gently fell around us was pure magic. Eleanor is a thoughtful host who left us local wine and coffee.',
    createdAt: new Date('2025-08-15'),
  },
  {
    authorName: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'The architectural details in this cabin are incredible. High-speed internet made remote work effortless, and waking up to 180-degree mountain views every morning was unforgettable.',
    createdAt: new Date('2025-07-22'),
  },
  {
    authorName: 'Emma Watson',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Five stars across the board! Impeccably clean, pristine finishes, and the bed was easily the most comfortable we have ever slept on. We will definitely be back next winter!',
    createdAt: new Date('2025-06-10'),
  },
  {
    authorName: 'David Miller',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'An absolute gem in Aspen. Easy access to hiking trails and downtown Aspen is only a 10-minute drive. Perfect combination of seclusion and luxury.',
    createdAt: new Date('2025-05-18'),
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

    const createdListing = await Listing.create(sampleListing);
    console.log(`Seeded main listing: "${createdListing.title}" (ID: ${createdListing._id})`);

    const additionalListings = [
      {
        ...sampleListing,
        title: 'Modern Minimalist Villa with Ocean Panorama',
        location: 'Malibu, California, United States',
        city: 'Malibu',
        country: 'United States',
        propertyType: 'Entire villa',
        pricePerNight: 750,
        rating: 4.96,
        reviewCount: 52,
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ],
      },
      {
        ...sampleListing,
        title: 'Cozy Historic Loft in Downtown Historic District',
        location: 'Charleston, South Carolina, United States',
        city: 'Charleston',
        country: 'United States',
        propertyType: 'Entire apartment',
        pricePerNight: 290,
        rating: 4.92,
        reviewCount: 24,
        images: [
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ],
      },
    ];

    await Listing.insertMany(additionalListings);
    console.log('Seeded secondary listings.');

    const reviewsWithListing = sampleReviews.map((r) => ({
      ...r,
      listing: createdListing._id,
      user: user._id,
    }));

    await Review.insertMany(reviewsWithListing);
    console.log(`Seeded ${sampleReviews.length} reviews for listing.`);

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
