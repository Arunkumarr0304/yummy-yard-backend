import express from 'express';
import {
    getDashboardStats,
    getSalesChart,
    getIncomeChart,
    getTransactions,
    getTrendingMenu
} from '../controllers/dashboardController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All dashboard routes are protected
router.get('/stats', authMiddleware, getDashboardStats);
router.get('/sales-chart', authMiddleware, getSalesChart);
router.get('/income-chart', authMiddleware, getIncomeChart);
router.get('/transactions', authMiddleware, getTransactions);
router.get('/trending', authMiddleware, getTrendingMenu);

export default router;
