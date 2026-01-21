const User = require('../models/User');
const Trainer = require('../models/Trainer');

exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeMembers = await User.find({ membershipStatus: 'active' }).populate('membershipPlan');

        // Sum the prices from each active member's plan
        const revenue = activeMembers.reduce((acc, member) => {
            return acc + (member.membershipPlan ? member.membershipPlan.priceNumeric : 0);
        }, 0);

        res.json({ totalUsers, activeMembers: activeMembers.length, revenue });
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
