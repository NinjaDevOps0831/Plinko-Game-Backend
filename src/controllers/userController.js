const User = require('../models/User');  
const Transaction = require('../models/Transaction');  
const GameHistory = require('../models/GameHistory');  

exports.getUserData = async (req, res) => {  
    try {  
        const user = await User.findById(req.user.id).select('-password');  
        // const transactions = await Transaction.find({ userId: req.user.id });  
        // const gameHistory = await GameHistory.find({ userId: req.user.id });  
        res.json({ user /*, transactions, gameHistory */ });  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};  

exports.requestWithdrawal = async (req, res) => {  
    const { amount } = req.body;  
    try {  
        const transaction = new Transaction({  
            userId: req.user.id,  
            amount,  
            type: 'withdrawal',  
            status: 'pending'  
        });  
        await transaction.save();  
        res.status(201).json({ msg: 'Withdrawal requested successfully' });  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};