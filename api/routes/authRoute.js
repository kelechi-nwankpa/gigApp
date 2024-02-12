import express from 'express';
const router = express.Router();
import { register } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import { logout } from '../controllers/authController.js';


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)

export default router;