import express from 'express';
const router = express.Router();
import {deleteUser, getUser} from "../controllers/userController.js"
import { verifyToken } from '../middleware/jwt.js';


router.delete("/:id",verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser)

export default router;