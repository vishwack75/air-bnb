import { Router } from 'express';
import { deleteReview } from '../controllers/reviewController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.delete('/:id', authenticate, deleteReview);

export default router;
