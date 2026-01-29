const multer = require('multer');
const path = require('path');

// Storage engine (Memory for Base64 conversion)
const storage = multer.memoryStorage();

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

/**
 * Wrapper to use multer as middleware in vanilla Node.js
 * @param {string} fieldName - Form field name for the file
 */
function withUpload(fieldName) {
    return (req, res, next) => {
        return new Promise((resolve, reject) => {
            upload.single(fieldName)(req, res, (err) => {
                if (err) {
                    res.status(400).json({ message: 'File upload error: ' + err.message });
                    return resolve();
                }
                next();
                resolve();
            });
        });
    };
}

module.exports = upload;
module.exports.withUpload = withUpload;
