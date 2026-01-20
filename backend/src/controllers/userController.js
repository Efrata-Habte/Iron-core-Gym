const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUserStatus = async (req, res) => {
    try {
        const { membershipStatus, paymentMethod } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { membershipStatus, paymentMethod },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
