import express from 'express';
const router = express.Router();
import { verifyToken } from '../middleware/jwt.js';
import { deleteReview, getReviews, postReview } from '../controllers/reviewController.js';


router.get("/:gigId", verifyToken, getReviews);
//router.get("/:id", verifyToken, getReview);
router.post("/", verifyToken, postReview);
router.delete("/:id", verifyToken, deleteReview);

export default router;