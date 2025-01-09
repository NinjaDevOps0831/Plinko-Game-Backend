const express = require('express');  
const { getUserData, requestWithdrawal } = require('../controllers/userController');  
const authMiddleware = require('../middlewares/authMiddleware');  
const router = express.Router();  

router.get('/me', authMiddleware, getUserData);  
router.post('/withdrawal', authMiddleware, requestWithdrawal);  

module.exports = router;