const { Router } = require('../core/Router');
const router = new Router();
const galleryController = require('../controllers/galleryController');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // Store files in memory buffer
const upload = multer({ storage });
const { protect, admin } = require('../middleware/authMiddleware');

// Wrapper to make multer work as middleware - returns a Promise for async Router compatibility
const withUpload = (fieldName) => (req, res, next) => {
    console.log('withUpload middleware called for field:', fieldName);
    return new Promise((resolve, reject) => {
        upload.single(fieldName)(req, res, (err) => {
            console.log('multer finished, err:', err, 'file:', req.file ? 'exists' : 'missing');
            if (err) {
                res.status(400).json({ message: 'File upload error: ' + err.message });
                return resolve(); // Resolve after sending error response
            }
            // Call next() and resolve the promise
            next();
            resolve();
        });
    });
};

router.get('/', galleryController.getGalleryImages);
router.get('/:id/image', galleryController.getGalleryImageFile); // New route to serve image data
router.post('/', protect, withUpload('image'), galleryController.uploadImage);

// Admin-only endpoints
router.get('/pending', protect, admin, galleryController.getPendingImages);
router.patch('/:id/approve', protect, admin, galleryController.approveImage);
router.delete('/:id', protect, admin, galleryController.deleteImage);

module.exports = router;
