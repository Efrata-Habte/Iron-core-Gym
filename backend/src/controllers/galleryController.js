const GalleryImage = require('../models/GalleryImage');

exports.getGalleryImages = async (req, res) => {
    try {
        const images = await GalleryImage.find();
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        const { title, category } = req.body;
        const image = new GalleryImage({
            title,
            category,
            image: req.file ? `/uploads/${req.file.filename}` : ''
        });
        await image.save();
        res.status(201).json(image);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
