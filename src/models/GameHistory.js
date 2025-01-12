const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const GameHistorySchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    betAmount: {  
        type: Number,  
        required: true  
    },  
    result: {  
        type: String,  
        enum: ['win', 'loss', 'draw'], 
        required: true  
    },  
    resultAmount: {  
        type: Number,  
        required: true 
    },  
    createdAt: {  
        type: Date,  
        default: Date.now  
    }  
});

module.exports = mongoose.model('GameHistory', GameHistorySchema);