const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/all', authMiddleware, getCart);
router.post('/add/:id', authMiddleware, addToCart);
router.get('/remove/:id', authMiddleware, removeFromCart);