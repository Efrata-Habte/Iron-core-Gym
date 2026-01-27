const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Basic routes
router.get('/', trainerController.getTrainers);

// Enrollment
router.post('/enroll/:id', protect, trainerController.enrollInTraining);

// Admin-only endpoints
router.post('/', protect, admin, upload.single('image'), trainerController.createTrainer);
router.delete('/:id', protect, admin, trainerController.deleteTrainer);

module.exports = router;
