# 06. Gallery & File Uploads Explained

This feature teaches you how to handle **Files** (Images) and **Admin Approvals**.

## Part 1: How to Upload Files (Multer)

Sending a file is different from sending text. Text is JSON. Files are **"Multipart/Form-Data"**.
Node.js needs a plugin called **Multer** to read them.

**The Setup (`middleware/uploadMiddleware.js`)**:
```javascript
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'backend/public/uploads/', // Where to put it?
    filename: (req, file, cb) => {
        // We rename the file so it doesn't overwrite others.
        // "photo.jpg" -> "image-178236123.jpg"
        const uniqueName = `image-${Date.now()}.jpg`;
        cb(null, uniqueName);
    }
});
```

---

## Part 2: The Upload Controller (`controllers/galleryController.js`)

**The Logic**:
1.  Multer saves the file to the hard drive.
2.  We save the **File Name** to the Database (NOT the file itself).
3.  We set the status to "Pending" so nobody sees it yet.

**The Code**:
```javascript
exports.uploadImage = async (req, res) => {
    // req.file is created by Multer. If it's missing, upload failed.
    if (!req.file) return res.status(400).json({ message: 'No file!' });

    // Create DB Entry
    await GalleryImage.create({
        url: `/uploads/${req.file.filename}`, // We save the PATH
        caption: req.body.caption,
        status: 'pending', // IMPORTANT: Hidden by default
        uploadedBy: req.user.id
    });

    res.json({ message: 'Uploaded! Waiting for Admin approval.' });
};
```

---

## Part 3: Admin Approval Workflow

**The Admin Controller**:
The Admin looks at pending images and clicks "Approve".

**The Code**:
```javascript
exports.updateImageStatus = async (req, res) => {
    const { status } = req.body; // "approved" or "rejected"
    
    const image = await GalleryImage.findById(req.params.id);
    image.status = status; // Change the flag
    await image.save();

    res.json({ message: `Image ${status}` });
};
```

**The Public View**:
When normal users ask for the gallery, we filter the results.
```javascript
// galleryController.getImages
const images = await GalleryImage.find({ status: 'approved' });
// This explicitly excludes "pending" or "rejected"
```
