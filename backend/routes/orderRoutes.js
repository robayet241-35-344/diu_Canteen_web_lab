// orderRoutes.js
// Connects URLs to their controller functions.

const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder } = require('../controllers/orderController');

router.get('/', getAllOrders);   // GET /api/orders
router.post('/', createOrder);   // POST /api/orders

module.exports = router;
