const Food = require('../models/foodModel');
const fs = require('fs');

const addFood = async (req, res) => {
    try {
        let img_filename = `${req.file.filename}`;
        const {name, desc, price, category} = req.body;

        const newFood = new Food({
            name,
            desc,
            price,
            category,
            imgUrl:img_filename
        });

        await newFood.save();

        res.status(200).json({message:"Food added"})
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {addFood};