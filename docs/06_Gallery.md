# 06. Gallery Deep Dive (Files & Approvals)

This feature involves two distinct parts:
1.  **File Upload**: Sending an image from the browser to the server's disk.
2.  **Approval Workflow**: An Admin must say "Yes" before the public sees it.

## Part 1: File Uploads

### The Middleware (`middleware/uploadMiddleware.js`)
Node.js doesn't understand files by default. We use a library called **Multer**.

```javascript
const multer = require('multer');

// Configure WHERE to save files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/public/uploads/'); // Save here
    },
    filename: (req, file, cb) => {
        // Create a unique name: "image-17234234.jpg"
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
```

### The Controller (`galleryController.uploadImage`)

```javascript
exports.uploadImage = async (req, res) => {
    // Multer puts the file info here:
    // req.file = { filename: "image-123.jpg", path: "..." }

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create DB Entry (Metadata)
    const newImage = await GalleryImage.create({
        url: `/uploads/${req.file.filename}`, // Save the path, not the actual file in DB!
        caption: req.body.caption,
        uploadedBy: req.user.id,
        status: 'pending' // Default hidden
    });

    res.status(201).json(newImage);
};
```

## Part 2: Serving Images (`backend/src/core/staticHandler.js`)
When the frontend asks for `<img src="/uploads/image-123.jpg" />`, the backend needs to respond.

**Vanilla Node Logic**:
1.  Check if URL starts with `/uploads`.
2.  Find file `backend/public/uploads/image-123.jpg`.
3.  Stream it to the browser.

## Part 3: Approval Flow
1.  **User Uploads**: DB has `status: 'pending'`.
2.  **Public Gallery (`GET /api/gallery`)**:
    ```javascript
    // Only return approved images
    const images = await GalleryImage.find({ status: 'approved' });
    res.json(images);
    ```
    *Result: The user's image is NOT returned.*
3.  **Admin Dashboard**:
    -   Calls `GET /api/gallery/pending` (Special admin route).
    -   Admin clicks "Approve".
    -   Backend runs: `image.status = 'approved'; await image.save();`.
4.  **Public Gallery**: Now the image appears!
