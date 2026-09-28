import { Router } from 'express';
import authRoutes from './authRoutes';
import listingRoutes from './listingRoutes';
import reviewRoutes from './reviewRoutes';
import amenityRoutes from './amenityRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/listings', listingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/amenities', amenityRoutes);

export default router;
