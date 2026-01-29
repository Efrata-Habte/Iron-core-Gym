const GalleryImage = require('../models/GalleryImage');

exports.getGalleryImages = async (req, res) => {
    try {
        // Exclude the heavy 'data' field from the list response for performance
        const images = await GalleryImage.find({ status: 'approved' })
            .select('-data') // Do not fetch binary data here
            .sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getGalleryImageFile = async (req, res) => {
    try {
        const image = await GalleryImage.findById(req.params.id);
        if (!image || !image.data) {
            return res.status(404).send('Image not found');
        }
        res.setHeader('Content-Type', image.contentType);
        res.send(image.data);
    } catch (err) {
        res.status(500).send({ message: err.message });
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

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const image = new GalleryImage({
            title,
            category,
            data: req.file.buffer, // Save buffer
            contentType: req.file.mimetype, // Save mimetype
            status,
            uploadedBy: req.user.id
        });
        await image.save();

        // Return object without huge data buffer
        const responseImage = image.toObject();
        delete responseImage.data;

        res.status(201).json(responseImage);
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
