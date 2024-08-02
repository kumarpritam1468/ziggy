const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { placeOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/place', authMiddleware, placeOrder);

module.exports = router;