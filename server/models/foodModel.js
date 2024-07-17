const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;