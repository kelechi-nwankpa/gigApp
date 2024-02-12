import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import { getOrder, intent, success } from '../controllers/orderController.js';
const router = express.Router();

router.get("/", verifyToken, getOrder);
//router.post("/:gigId", verifyToken, createOrder);
router.post("/create-payment-intent/:gigId", verifyToken, intent);
router.put("/", verifyToken, success)

export default router;