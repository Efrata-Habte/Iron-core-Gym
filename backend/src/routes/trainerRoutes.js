const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

router.get('/', trainerController.getTrainers);
router.post('/', trainerController.createTrainer); // Admin only in real app

module.exports = router;
