const { Router } = require('../core/Router');
const router = new Router();
const userController = require('../controllers/userController');
const { protect, admin, superAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, userController.getAllUsers);
router.patch('/:id', protect, admin, userController.updateUserStatus);
router.patch('/:id/toggle-admin', protect, superAdmin, userController.toggleAdminStatus);

module.exports = router;
