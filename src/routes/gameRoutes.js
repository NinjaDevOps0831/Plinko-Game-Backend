const express = require('express');  
const { getGameHistories, createGameHistory, getGameHistoryById } = require('../controllers/gameController');  
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();  

router.get('/game-histories', authMiddleware, getGameHistories);  
router.post('/game-histories', authMiddleware, createGameHistory);  
router.get('/game-histories/:id', authMiddleware, getGameHistoryById);  

module.exports = router;