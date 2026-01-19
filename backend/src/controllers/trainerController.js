const Trainer = require('../models/Trainer');

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
        const { name, years, headline, headlineAccent, quote, image, position } = req.body;
        const trainer = new Trainer({ name, years, headline, headlineAccent, quote, image, position });
        await trainer.save();
        res.status(201).json(trainer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
