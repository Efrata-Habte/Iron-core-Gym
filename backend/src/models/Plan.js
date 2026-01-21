const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    title: { type: String, required: true },
    monthlyPrice: { type: String, required: true },
    yearlyPrice: { type: String, required: true },
    priceNumeric: { type: Number, required: true },
    features: [{ type: String }],
    badge: { type: String } // 'basic', 'pro', 'plus'
});

module.exports = mongoose.model('Plan', planSchema);
