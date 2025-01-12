const express = require('express');  
const { getUserData, requestWithdrawal, requestDeposit } = require('../controllers/userController');  
const authMiddleware = require('../middlewares/authMiddleware');  
const router = express.Router();  

router.get('/me', authMiddleware, getUserData);  
router.post('/withdrawal', authMiddleware, requestWithdrawal);  
router.post('/deposit', authMiddleware, requestDeposit)

module.exports = router;