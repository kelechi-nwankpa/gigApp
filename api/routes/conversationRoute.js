import express from 'express';
const router = express.Router();
import { verifyToken } from '../middleware/jwt.js';
import { createConversation, getConversation, getConversations, updateConversation } from '../controllers/conversationController.js';


router.get("/", verifyToken, getConversations);
router.get("/:conversationId", verifyToken, getConversation);
router.post("/", verifyToken, createConversation);
router.put("/:conversationId", verifyToken, updateConversation);

export default router;