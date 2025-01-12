const mongoose = require('mongoose');  
const bcrypt = require('bcryptjs');  

const UserSchema = new mongoose.Schema({  
    walletAddress: {  
        type: String,  
        required: true,  
        unique: true  
    },  
    role: {  
        type: String,  
        enum: ['user', 'admin'],  
        default: 'user'  
    },  
    balance: {  
        type: Number,  
        default: 0  
    },  
    password: {  
        type: String,  
        required: true  
    },  
    createdAt: {  
        type: Date,  
        default: Date.now  
    }  
});  

// Encrypt password before saving  
UserSchema.pre('save', async function(next) {  
    if (!this.isModified('password')) {  
        return next();  
    }  
    try {
        const salt = await bcrypt.genSalt(10);  
        this.password = await bcrypt.hash(this.password, salt);  
        next();  
    } catch (error) {
        next(error)
    }
});  

module.exports = mongoose.model('User', UserSchema);