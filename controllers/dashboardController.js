/**
 * Dashboard Controller
 * Returns dashboard statistics and chart data
 * Note: Values are currently set to 0 or defaults until mobile app is launched
 */

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (req, res) => {
    try {
        // TODO: These dynamic values will be calculated from real order data
        // when mobile app is launched. Currently returning 0.
        // Static parts (title, icon, color, subtitle) remain in frontend
        
        const stats = {
            totalSale: {
                value: '$0',
                change: '0%',
                trend: 'up'
            },
            totalOrder: {
                value: '0',
                change: '0%',
                trend: 'up'
            },
            totalRevenue: {
                value: '$0',
                change: '0%',
                trend: 'up'
            },
            cancelledOrder: {
                value: '0',
                change: '0%',
                trend: 'down'
            }
        };

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get sales chart data
// @route   GET /api/dashboard/sales-chart
// @access  Private
export const getSalesChart = async (req, res) => {
    try {
        // TODO: These values will be aggregated from monthly sales data
        // when mobile app is launched. Currently returning 0 for all months.
        
        const salesData = [
            { name: 'Jan', value: 0 },
            { name: 'Feb', value: 0 },
            { name: 'Mar', value: 0 },
            { name: 'Apr', value: 0 },
            { name: 'May', value: 0 },
            { name: 'Jun', value: 0 }
        ];

        res.status(200).json({
            success: true,
            data: salesData
        });
    } catch (error) {
        console.error('Error fetching sales chart:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get income chart data
// @route   GET /api/dashboard/income-chart
// @access  Private
export const getIncomeChart = async (req, res) => {
    try {
        // TODO: These values will be calculated from order categories
        // when mobile app is launched. Currently returning 0.
        
        const incomeData = [
            { name: 'Main Course', value: 0, color: '#153B9C' },
            { name: 'Beverage', value: 0, color: '#2261FF' },
            { name: 'Others', value: 0, color: '#A4BEFF' }
        ];

        res.status(200).json({
            success: true,
            data: incomeData
        });
    } catch (error) {
        console.error('Error fetching income chart:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get recent transactions
// @route   GET /api/dashboard/transactions
// @access  Private
export const getTransactions = async (req, res) => {
    try {
        // TODO: These will be fetched from Order model
        // when mobile app is launched. Currently returning empty array.
        
        const transactions = []; // Will populate from orders table

        res.status(200).json({
            success: true,
            data: transactions
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get trending menu items
// @route   GET /api/dashboard/trending
// @access  Private
export const getTrendingMenu = async (req, res) => {
    try {
        // TODO: These will be calculated from most ordered items
        // when mobile app is launched. Currently returning empty array.
        
        const trendingMenu = []; // Will populate from order analytics

        res.status(200).json({
            success: true,
            data: trendingMenu
        });
    } catch (error) {
        console.error('Error fetching trending menu:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
