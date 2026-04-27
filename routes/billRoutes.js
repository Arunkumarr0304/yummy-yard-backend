import express from 'express';
import {
    getBills,
    getBillById,
    createBill,
    updateBill,
    deleteBill,
    printBill
} from '../controllers/billController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All bill routes are protected
router.get('/', authMiddleware, getBills);
router.get('/:id', authMiddleware, getBillById);
router.post('/', authMiddleware, createBill);
router.put('/:id', authMiddleware, updateBill);
router.delete('/:id', authMiddleware, deleteBill);
router.post('/:id/print', authMiddleware, printBill);

export default router;
