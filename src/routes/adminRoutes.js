const express = require('express');  
const { approveWithdrawals } = require('../controllers/adminController');  
const authMiddleware = require('../middlewares/authMiddleware');  
const roleMiddleware = require('../middlewares/roleMiddleware');  
const router = express.Router();  

router.post('/approve-withdrawals', authMiddleware, roleMiddleware('admin'), approveWithdrawals);  

module.exports = router;