import type { Listing } from '../features/listing/types/listing.types';

export function isGuestFavourite(listing: Listing): boolean {
  return listing.rating >= 4.88 && listing.reviewCount >= 3;
}

/** Short card title e.g. "Flat in Pashan" */
export function getListingCardTitle(listing: Listing): string {
  if (listing.title.length <= 40) {
    return listing.title;
  }
  const inMatch = listing.location.split(',')[0]?.trim();
  const type = listing.propertyType.replace(/^Entire\s+/i, '');
  return inMatch ? `${type} in ${inMatch}` : listing.title.slice(0, 40);
}
