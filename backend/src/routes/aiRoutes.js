const { Router } = require('../core/Router');
const router = new Router();
const aiChatbotController = require('../controllers/aiChatbotController');

router.post('/chat', aiChatbotController.chat);

module.exports = router;
