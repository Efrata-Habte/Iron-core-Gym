const { Router } = require('../core/Router');
const router = new Router();
const statsController = require('../controllers/statsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, statsController.getStats);
router.get('/public', statsController.getPublicStats);

module.exports = router;
