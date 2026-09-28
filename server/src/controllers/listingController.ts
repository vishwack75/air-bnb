import { Request, Response } from 'express';
import { listingService } from '../services/listingService';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { ListingQueryInput } from '../validators/listingValidator';

export const getListings = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as ListingQueryInput;
  const { listings, pagination } = await listingService.getListings(query);
  return sendResponse(res, 200, listings, undefined, pagination);
});

export const getListingById = asyncHandler(async (req: Request, res: Response) => {
  const listing = await listingService.getListingById(req.params.id);
  return sendResponse(res, 200, listing);
});

export const createListing = asyncHandler(async (req: Request, res: Response) => {
  const listing = await listingService.createListing(req.body);
  return sendResponse(res, 201, listing, 'Listing created successfully');
});

export const updateListing = asyncHandler(async (req: Request, res: Response) => {
  const listing = await listingService.updateListing(req.params.id, req.body);
  return sendResponse(res, 200, listing, 'Listing updated successfully');
});

export const deleteListing = asyncHandler(async (req: Request, res: Response) => {
  await listingService.deleteListing(req.params.id);
  return sendResponse(res, 200, null, 'Listing deleted successfully');
});

export const getCities = asyncHandler(async (_req: Request, res: Response) => {
  const cities = await listingService.getCities();
  return sendResponse(res, 200, cities);
});
