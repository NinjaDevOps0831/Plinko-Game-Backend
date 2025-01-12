const User = require('../models/User');  
const Transaction = require('../models/Transaction');  
const GameHistory = require('../models/GameHistory');  

exports.getUserData = async (req, res) => {  
    try {  
        const user = await User.findById(req.user.id).select('-password');  
        const transactions = await Transaction.find({ user: req.user.id });  
        const gameHistory = await GameHistory.find({ user: req.user.id });  
        res.json({ user, transactions, gameHistory });  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};  

exports.requestDeposit = async (req, res) => {  
    const { amount } = req.body;  

    if (amount <= 0) {  
        return res.status(400).json({ msg: 'Deposit amount must be greater than zero' });  
    }  

    try {  
        const transaction = new Transaction({  
            user: req.user.id,
            amount,  
            type: 'deposit',  
            status: 'completed'
        });  

        await transaction.save();  

        await User.findByIdAndUpdate(req.user.id, { $inc: { balance: amount } });  

        res.status(201).json({ msg: 'Deposit completed successfully' });  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};  

exports.requestWithdrawal = async (req, res) => {  
    const { amount } = req.body;  
    try {  
        const transaction = new Transaction({  
            user: req.user.id,  
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