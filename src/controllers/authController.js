const jwt = require('jsonwebtoken');  
const bcrypt = require('bcryptjs');  
const User = require('../models/User');  
require('dotenv').config();  

exports.register = async (req, res) => {  
    const { walletAddress, password } = req.body;  
    try {  
        let user = await User.findOne({ walletAddress });  
        if (user) {  
            return res.status(400).json({ msg: 'User already exists' });  
        }  
        user = new User({ walletAddress, password });  
        await user.save();  
        res.status(201).json({ success: true, msg: 'User registered' });  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};  

exports.login = async (req, res) => {  
    const { walletAddress, password } = req.body;  
    try {  
        const user = await User.findOne({ walletAddress });  
        if (!user) {  
            return res.status(400).json({ msg: 'Invalid credentials' });  
        }  
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {  
            return res.status(400).json({ msg: 'Invalid credentials' });  
        }  
        const payload = {  
            user: {  
                id: user.id,  
                role: user.role  
            }  
        };  
        jwt.sign(  
            payload,  
            process.env.JWT_SECRET,  
            { expiresIn: '1h' },  
            (err, token) => {  
                if (err) throw err;  
                res.json({ token });  
            }  
        );  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};