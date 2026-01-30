const GalleryImage = require('../models/GalleryImage');

exports.getGalleryImages = async (req, res) => {
    try {
        // Fetch all approved images including binary data for backward compatibility
        const images = await GalleryImage.find({ status: 'approved' })
            .populate('uploadedBy', 'name')
            .sort({ createdAt: -1 });

        // Normalize response: use 'url' if available, otherwise construct from 'data'
        const normalized = images.map(img => {
            const obj = img.toObject();
            if (!obj.url && obj.data) {
                // Convert binary data to base64 URL
                const b64 = obj.data.toString('base64');
                obj.url = `data:${obj.contentType || 'image/jpeg'};base64,${b64}`;
            }
            delete obj.data; // Don't send raw binary to client
            return obj;
        });
        res.json(normalized);
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
        // Admins and super-admins are auto-approved, regular users are pending
        const status = (req.user.role === 'admin' || req.user.role === 'super-admin') ? 'approved' : 'pending';

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        let imageUrl = '';
        if (req.file) {
            const b64 = req.file.buffer.toString('base64');
            imageUrl = `data:${req.file.mimetype};base64,${b64}`;
        }

        const image = new GalleryImage({
            title,
            category: category || 'General',
            url: imageUrl,
            status,
            uploadedBy: req.user.id
        });
        await image.save();

        res.status(201).json(image);
    } catch (err) {
        // Check for MongoDB quota/storage limit errors
        if (err.code === 16500 || err.message.includes('quota') ||
            err.message.includes('storage') || err.message.includes('limit') ||
            err.message.includes('exceeded') || err.codeName === 'ExceededMemoryLimit') {
            return res.status(507).json({
                message: 'Database storage capacity is full. Please contact the administrator.',
                isStorageFull: true
            });
        }
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
