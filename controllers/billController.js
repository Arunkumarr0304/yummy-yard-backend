import Bill from '../models/Bill.js';

// @desc    Get all bills
// @route   GET /api/bills
// @access  Private
export const getBills = async (req, res) => {
    try {
        const { status, search, page = 1, limit = 10 } = req.query;
        
        // Build query
        let query = {};
        
        // Filter by status if provided
        if (status && status !== 'all') {
            query.status = status;
        }
        
        // Search by customer name
        if (search) {
            query.customerName = { $regex: search, $options: 'i' };
        }
        
        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Get bills with pagination
        const bills = await Bill.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        
        // Get total count
        const total = await Bill.countDocuments(query);
        
        res.status(200).json({
            success: true,
            count: bills.length,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            data: bills
        });
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get single bill by ID
// @route   GET /api/bills/:id
// @access  Private
export const getBillById = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: bill
        });
    } catch (error) {
        console.error('Error fetching bill:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Create new bill
// @route   POST /api/bills
// @access  Private
export const createBill = async (req, res) => {
    try {
        const bill = await Bill.create(req.body);
        
        res.status(201).json({
            success: true,
            data: bill
        });
    } catch (error) {
        console.error('Error creating bill:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Update bill status
// @route   PUT /api/bills/:id
// @access  Private
export const updateBill = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: bill
        });
    } catch (error) {
        console.error('Error updating bill:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Delete bill
// @route   DELETE /api/bills/:id
// @access  Private
export const deleteBill = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.id);
        
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Bill deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting bill:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Print bill
// @route   POST /api/bills/:id/print
// @access  Private
export const printBill = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found'
            });
        }
        
        // TODO: Implement actual printing logic or PDF generation
        // For now, just return success
        res.status(200).json({
            success: true,
            message: 'Bill printed successfully',
            data: bill
        });
    } catch (error) {
        console.error('Error printing bill:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
