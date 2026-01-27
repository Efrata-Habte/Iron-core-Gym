const { Router } = require('../core/Router');
const router = new Router();
const trainerController = require('../controllers/trainerController');
const { protect, admin } = require('../middleware/authMiddleware');
const { withUpload } = require('../middleware/uploadMiddleware');

// Basic routes
router.get('/', trainerController.getTrainers);

// Enrollment
router.post('/enroll/:id', protect, trainerController.enrollInTraining);

// Admin-only endpoints
router.post('/', protect, admin, withUpload('image'), trainerController.createTrainer);
router.delete('/:id', protect, admin, trainerController.deleteTrainer);

module.exports = router;
