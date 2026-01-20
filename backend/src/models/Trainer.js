const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    years: { type: Number, required: true },
    headline: { type: String },
    headlineAccent: { type: String },
    quote: { type: String },
    image: { type: String }, // Path to image file
    position: { type: String, enum: ['left', 'right'], default: 'right' },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Trainer', trainerSchema);
