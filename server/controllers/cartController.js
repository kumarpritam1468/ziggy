const User = require('../models/userModel');

const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const {id:itemId} = req.params;

        const user = await User.findById(userId);

        let cartData = user.cartData;

        if(!cartData[itemId]){
            cartData[itemId] = 1;
        } else {
            cartData[itemId]++;
        }

        await User.findByIdAndUpdate(userId, {cartData});

        res.status(200).json("Added to Cart");
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const removeFromCart = async (req, res) => {

}

const getCart = async (req, res) => {

}

module.exports = { getCart, addToCart, removeFromCart };