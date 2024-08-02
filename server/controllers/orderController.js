const Razorpay = require('razorpay');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_fuRA2KuUz227eb",
    key_secret: "zSd8zAu74rStb94h6Y4wQ5yN"
})

const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;

        const order = new Order({
            userId,
            items,
            amount,
            address
        });

        // await order.save();
        await User.findByIdAndUpdate(userId, { cartData: {} });

        const razorpayOrder = await razorpayInstance.orders.create({
            amount: order.amount * 100,
            currency: 'INR',
            receipt: order._id.toString(),
            payment_capture: 1
        });

        res.status(200).json(razorpayOrder);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { placeOrder };