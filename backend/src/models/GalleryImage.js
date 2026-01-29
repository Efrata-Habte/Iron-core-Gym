const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
    title: { type: String },
    data: { type: Buffer, required: true }, // Binary image data
    contentType: { type: String, required: true }, // MIME type
    category: { type: String, default: 'general' },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for the image URL
galleryImageSchema.virtual('image').get(function () {
    return `/api/gallery/${this._id}/image`;
});

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
