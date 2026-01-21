const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Plan = require('../models/Plan');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, plan, phone, paymentMethod } = req.body;

        if (!plan) {
            return res.status(400).json({ message: 'Membership plan is required' });
        }

        // Helper to escape regex special characters
        const escapedPlan = plan.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const selectedPlan = await Plan.findOne({ title: { $regex: escapedPlan, $options: 'i' } });

        if (!selectedPlan) {
            return res.status(400).json({ message: 'Invalid membership plan selected' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({
            name,
            email,
            password,
            role,
            membershipStatus: 'active',
            membershipPlan: selectedPlan._id,
            phone,
            paymentMethod: paymentMethod || req.body['pay-method']
        });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                membershipStatus: user.membershipStatus,
                membershipPlan: selectedPlan.title,
                assignedTrainer: user.assignedTrainer
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for: ${email}`);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('Login failed: User not found');
            return res.status(400).json({ message: 'User with this email does not exist.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Login failed: Password mismatch');
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                assignedTrainer: user.assignedTrainer
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
