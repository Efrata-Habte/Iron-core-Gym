const Trainer = require('../models/Trainer');
const User = require('../models/User');

exports.getTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.json(trainers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTrainer = async (req, res) => {
    try {
        const { name, years, headline, headlineAccent, quote, image, position, maxTrainees } = req.body;
        let imagePath = image;
        if (req.file) {
            // Convert buffer to base64
            const b64 = req.file.buffer.toString('base64');
            imagePath = `data:${req.file.mimetype};base64,${b64}`;
        }

        const trainer = new Trainer({
            name,
            years,
            headline,
            headlineAccent,
            quote,
            image: imagePath,
            position,
            maxTrainees: maxTrainees || 5
        });

        await trainer.save();
        res.status(201).json(trainer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!trainer) return res.status(404).json({ message: 'Trainer not found' });

        // Also unassign this trainer from all users
        await User.updateMany(
            { assignedTrainer: req.params.id }, 
            { $unset: { assignedTrainer: 1 } }
        );

        res.json({ message: 'Trainer removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.enrollInTraining = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) return res.status(404).json({ message: 'Trainer not found' });

        if (trainer.currentTrainees >= trainer.maxTrainees) {
            return res.status(400).json({ message: 'This trainer is already at full capacity' });
        }

        const user = await User.findById(req.user.id);
        if (user.assignedTrainer) {
            return res.status(400).json({ message: 'You are already enrolled with a trainer' });
        }

        // Assign user and update trainer count
        user.assignedTrainer = trainer._id;
        await user.save();

        trainer.currentTrainees += 1;
        // Explicitly set availability
        trainer.isAvailable = trainer.currentTrainees < trainer.maxTrainees;

        await trainer.save();

        console.log(`[ENROLL] User ${user.email} enrolled with trainer ${trainer.name}`);

        res.json({
            message: `Successfully enrolled with ${trainer.name}!`,
            trainer
        });
    } catch (err) {
        console.error('[ENROLL ERROR]', err);
        res.status(500).json({ message: 'An error occurred during enrollment. Please try again later.' });
    }
};
