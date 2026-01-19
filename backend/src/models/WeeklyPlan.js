const mongoose = require('mongoose');

const weeklyPlanSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: [
        {
            day: { type: String, required: true }, // Monday, Tuesday, etc.
            workout: { type: String },
            meal: { type: String }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeeklyPlan', weeklyPlanSchema);
