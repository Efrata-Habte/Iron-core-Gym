const GalleryImage = require('../models/GalleryImage');

exports.getGalleryImages = async (req, res) => {
    try {
        const images = await GalleryImage.find({ status: 'approved' }).sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPendingImages = async (req, res) => {
    try {
        const images = await GalleryImage.find({ status: 'pending' }).populate('uploadedBy', 'name email').sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        const { title, category } = req.body;
        // Admins are auto-approved, users are pending
        const status = req.user.role === 'admin' ? 'approved' : 'pending';

        const image = new GalleryImage({
            title,
            category,
            image: req.file ? `/uploads/${req.file.filename}` : '',
            status,
            uploadedBy: req.user.id
        });
        await image.save();
        res.status(201).json(image);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.approveImage = async (req, res) => {
    try {
        const image = await GalleryImage.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.json(image);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const image = await GalleryImage.findByIdAndDelete(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
