// orderController.js
// Contains the logic for the two order-related API endpoints.

const db = require('../db');

// GET /api/orders
// Reads every row from the orders table, newest orders first.
const getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM orders ORDER BY order_date DESC'
        );
        res.json(rows);
    } catch (error) {
        console.log('Error while fetching orders:', error);
        res.status(500).json({ message: 'Something went wrong while fetching orders' });
    }
};

// POST /api/orders
// Inserts a new order into MySQL.
// IMPORTANT (this is what makes the order "instantly" show up):
//   1. We `await` the INSERT, so the function only sends a response
//      AFTER the row is actually saved in the database.
//   2. Only then does the frontend get a success reply.
//   3. Only then does the frontend call GET /api/orders again to refresh the table.
// So by the time the user sees the new row, it is already really in MySQL - not a temporary fake row.
const createOrder = async (req, res) => {
    try {
        const { customer_name, item_name, quantity, total_price } = req.body;

        // Basic validation - just checking nothing important is missing
        if (!customer_name || !item_name || !quantity) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Parameterized query ("?" placeholders) - safe from SQL injection
        const [result] = await db.query(
            'INSERT INTO orders (customer_name, item_name, quantity, total_price) VALUES (?, ?, ?, ?)',
            [customer_name, item_name, quantity, total_price]
        );

        // Only sent after the insert above has finished successfully
        res.status(201).json({
            message: 'Order placed successfully',
            orderId: result.insertId
        });
    } catch (error) {
        console.log('Error while creating order:', error);
        res.status(500).json({ message: 'Something went wrong while placing order' });
    }
};

module.exports = { getAllOrders, createOrder };
