const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', trainerController.getTrainers);
router.post('/', protect, admin, upload.single('image'), trainerController.createTrainer);
// Admin only in real app

module.exports = router;
