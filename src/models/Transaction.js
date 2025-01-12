const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({  
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['withdrawal', 'deposit']
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed']
    },
    createdAt: {  
        type: Date,  
        default: Date.now  
    }  
});  

module.exports = mongoose.model('Transaction', TransactionSchema);