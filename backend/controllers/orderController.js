const db = require('../db');

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

const createOrder = async (req, res) => {
    try {
        const { customer_name, item_name, quantity, total_price } = req.body;

      
        if (!customer_name || !item_name || !quantity) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        
        const [result] = await db.query(
            'INSERT INTO orders (customer_name, item_name, quantity, total_price) VALUES (?, ?, ?, ?)',
            [customer_name, item_name, quantity, total_price]
        );


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
