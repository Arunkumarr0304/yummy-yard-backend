import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { sendOTP, verifyOTP, resetPassword } from '../controllers/forgotPasswordController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Forgot password routes
router.post('/forgot-password', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', authMiddleware, getMe);

export default router;
