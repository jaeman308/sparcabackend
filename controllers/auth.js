const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const saltRounds = 12;

router.post("/sign-up", async (req, res) => { 
    try{
        const userInDatabase = await User.findOne({username: req.body.username});
        if(userInDatabase){
            return res.status(400).json({message: "Username already exists"});
        }
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            hashedPassword: await bcrypt.hash(req.body.password, saltRounds)
        });
        const payload = {userId: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
        res.status(201).json({token, user});
    }catch (error) {
        res.status(500).json({message: "Error signing up", error});
    }
});

router.post("/sign-in", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(400).json({message: "Invalid username or password"});
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.hashedPassword);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid username or password"});
        }
        const payload = {userId: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
        res.status(200).json({token, user});
    } catch (error) {
        res.status(500).json({message: "Error signing in", error});
    }
});

module.exports = router;    
