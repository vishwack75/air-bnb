import { Router } from 'express';
import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getCities
} from '../controllers/listingController';
import { getListingReviews, createReview } from '../controllers/reviewController';
import { validateBody, validateQuery } from '../middleware/validate';
import {
  createListingSchema,
  updateListingSchema,
  listingQuerySchema,
} from '../validators/listingValidator';
import { createReviewSchema } from '../validators/reviewValidator';
import { authenticate, optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/', validateQuery(listingQuerySchema), getListings);
router.get('/cities', getCities);
router.get('/:id', getListingById);
router.post('/', authenticate, validateBody(createListingSchema), createListing);
router.patch('/:id', authenticate, validateBody(updateListingSchema), updateListing);
router.delete('/:id', authenticate, deleteListing);

// Nested reviews endpoints for listing
router.get('/:id/reviews', getListingReviews);
router.post('/:id/reviews', optionalAuth, validateBody(createReviewSchema), createReview);

export default router;
