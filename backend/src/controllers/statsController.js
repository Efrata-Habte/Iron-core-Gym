const User = require('../models/User');
const Trainer = require('../models/Trainer');

exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeMembers = await User.countDocuments({ membershipStatus: 'active' });
        // Simple revenue estimation: active members * $50
        const revenue = activeMembers * 50;

        res.json({ totalUsers, activeMembers, revenue });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPublicStats = async (req, res) => {
    try {
        const trainersCount = await Trainer.countDocuments();
        const traineesCount = await User.countDocuments(); // Simplification: all users are trainees
        const foundationDate = new Date('2013-01-01');
        const today = new Date();
        const yearsExperience = today.getFullYear() - foundationDate.getFullYear();

        res.json({ trainersCount, traineesCount, yearsExperience });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
