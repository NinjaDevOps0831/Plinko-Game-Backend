const User = require('../models/User');  
const Transaction = require('../models/Transaction');  
const cron = require('node-cron');  
// const { executeWithdrawal } = require('../utils/smartContract');  

exports.approveWithdrawals = async (req, res) => {  
    try {  
        const withdrawals = await Transaction.find({  
            type: 'withdrawal',  
            status: 'pending',  
            createdAt: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) }  
        });  

        withdrawals.forEach(async (withdrawal) => {  
            // await executeWithdrawal(withdrawal);  
            withdrawal.status = 'completed';  
            await withdrawal.save();  
        });  

        res.json({ msg: 'Withdrawals approved' });  
    } catch (err) {  
        console.error(err);  
        res.status(500).json({ msg: 'Server error' });  
    }  
};  

// Scheduling the task to run every day at midnight  
cron.schedule('0 0 * * *', async () => {  
    const withdrawals = await Transaction.find({  
        type: 'withdrawal',  
        status: 'pending',  
        createdAt: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) }  
    });  

    withdrawals.forEach(async (withdrawal) => {  
        await executeWithdrawal(withdrawal);  
        withdrawal.status = 'completed';  
        await withdrawal.save();  
    });  

    console.log('Daily withdrawal approvals completed.');  
});