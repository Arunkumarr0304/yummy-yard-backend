import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Private
export const getProducts = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        
        // Build query
        let query = {};
        
        // Filter by category if provided
        if (category && category !== 'all') {
            query.category = category;
        }
        
        // Search by product name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        
        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Get products with pagination
        const products = await Product.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        
        // Get total count
        const total = await Product.countDocuments(query);
        
        res.status(200).json({
            success: true,
            count: products.length,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            data: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Private
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
    try {
        const { name, code, category, stock, price } = req.body;
        
        // Check if product code already exists
        const existingProduct = await Product.findOne({ code });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product code already exists'
            });
        }
        
        const product = await Product.create({
            name,
            code,
            category,
            stock: parseInt(stock) || 0,
            price: parseFloat(price),
            image: req.file ? `/uploads/${req.file.filename}` : ''
        });
        
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
    try {
        const { name, category, stock, price } = req.body;
        
        const updateData = {
            name,
            category,
            stock: parseInt(stock) || 0,
            price: parseFloat(price)
        };
        
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
