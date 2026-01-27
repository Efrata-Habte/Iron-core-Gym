const { Router } = require('../core/Router');
const router = new Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.sendContactEmail);

module.exports = router;
