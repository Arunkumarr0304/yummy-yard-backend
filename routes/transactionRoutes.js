import express from 'express';
import {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    exportTransactions
} from '../controllers/transactionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All transaction routes are protected
router.get('/', authMiddleware, getTransactions);
router.get('/export', authMiddleware, exportTransactions);
router.get('/:id', authMiddleware, getTransactionById);
router.post('/', authMiddleware, createTransaction);
router.put('/:id', authMiddleware, updateTransaction);
router.delete('/:id', authMiddleware, deleteTransaction);

export default router;
