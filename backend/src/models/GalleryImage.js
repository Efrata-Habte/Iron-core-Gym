const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
    title: { type: String },
    image: { type: String, required: true }, // Path to image file
    category: { type: String, default: 'general' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
