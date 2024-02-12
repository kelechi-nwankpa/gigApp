import express from 'express';
const router = express.Router();
import Gig from "../models/gigModel.js";
import { verifyToken } from '../middleware/jwt.js';
import { createGig,getGig, getGigs, deleteGig } from '../controllers/gigController.js';


router.get("/", verifyToken, getGigs);
router.get("/single/:id", verifyToken, getGig);
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);

export default router;