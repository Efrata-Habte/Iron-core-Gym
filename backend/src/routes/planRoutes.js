const { Router } = require('../core/Router');
const router = new Router();
const planController = require('../controllers/planController');

router.get('/', planController.getPlans);
router.post('/', planController.createPlan); // Admin only in real app

module.exports = router;
