const { Router } = require('../core/Router');
const router = new Router();
const galleryController = require('../controllers/galleryController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const { protect, admin } = require('../middleware/authMiddleware');

// Wrapper to make multer work as middleware
const withUpload = (fieldName) => (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload error: ' + err.message });
        }
        next();
    });
};

router.get('/', galleryController.getGalleryImages);
router.post('/', protect, withUpload('image'), galleryController.uploadImage);

// Admin-only endpoints
router.get('/pending', protect, admin, galleryController.getPendingImages);
router.patch('/:id/approve', protect, admin, galleryController.approveImage);
router.delete('/:id', protect, admin, galleryController.deleteImage);

module.exports = router;
