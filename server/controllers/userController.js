const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const validator = require('validator')
const User = require('../models/userModel');

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({error:"Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({error:"Invalid Credentials"})
        }

        const token = createToken(user._id);
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json(error);
    }
}

//register user
const registerUser = async (req,res) => {
    try{
        const {name, email, password} = req.body;
        const exists = await User.findOne({email})
        if(exists){
            return res.status(400).json({error:"User already exists"});
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({error: "Please enter a valid email"});
        }
        if(password.length<8){
            return res.status(400).json({error: "Please enter a strong password"});
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({name, email, password: hashedPassword});
        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json(token);

    } catch(error){
        res.status(500).json(error);
    }
}

module.exports = {registerUser, loginUser};