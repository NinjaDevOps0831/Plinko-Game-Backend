const GameHistory = require('../models/GameHistory');  
const User = require('../models/User');  

exports.getGameHistories = async (req, res) => {  
    try {  
        const gameHistories = await GameHistory.find({ user: req.user.id }).populate('user');  
        res.json({ gameHistories });  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};  

exports.createGameHistory = async (req, res) => {  
    const { betAmount, result, resultAmount } = req.body;  

    if (!['win', 'loss', 'draw'].includes(result)) {  
        return res.status(400).json({ msg: 'Invalid result type' });  
    }  

    try {  
        const newGameHistory = new GameHistory({  
            user: req.user.id,  
            betAmount,  
            result,  
            resultAmount  
        });  

        await newGameHistory.save();  
        res.status(201).json({ msg: 'Game history record created successfully', newGameHistory });  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};  

exports.getGameHistoryById = async (req, res) => {  
    try {  
        const gameHistory = await GameHistory.findById(req.params.id).populate('user');  

        if (!gameHistory || gameHistory.user._id.toString() !== req.user.id) {  
            return res.status(404).json({ msg: 'Game history record not found' });  
        }  

        res.json({ gameHistory });  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};