import { Router } from 'express';
import { getAmenities } from '../controllers/amenityController';

const router = Router();

router.get('/', getAmenities);

export default router;
