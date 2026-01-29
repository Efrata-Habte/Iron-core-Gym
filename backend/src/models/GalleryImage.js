const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
    title: { type: String },
    url: { type: String, required: true }, // Stores Base64 string "data:image..."
    category: { type: String, default: 'General' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
