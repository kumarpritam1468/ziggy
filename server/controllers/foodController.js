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

        res.status(201).json({message:"Food added"})
    } catch (error) {
        res.status(500).json(error);
    }
}

const allFoods = async (req, res) => {
    try {
        const foods = await Food.find({});

        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json(error);
    }
}

const removeFood = async (req, res) => {
    try {
        const {id:foodId} = req.params;
        const food = await Food.findById(foodId);
        if(!food){
            res.status(404).json({error:"Food not found"});
        }

        fs.unlink(`uploads/${food.imgUrl}`, () => {});

        await Food.findByIdAndDelete(foodId);

        res.status(200).json({message:"Food deleted!"});
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {addFood, allFoods, removeFood};