const express = require('express');
const router = express.Router();
const aiChatbotController = require('../controllers/aiChatbotController');

router.post('/chat', aiChatbotController.chat);

module.exports = router;
