import express from 'express';
const router = express.Router();
import Message from "../models/messageModel.js";
import { verifyToken } from '../middleware/jwt.js';
import { createMessage, getMessage, updateMessage } from '../controllers/messageController.js';


router.get("/:conversationId", verifyToken, getMessage);
router.post("/", verifyToken, createMessage);
router.put("/:conversationId", verifyToken, updateMessage);

export default router;