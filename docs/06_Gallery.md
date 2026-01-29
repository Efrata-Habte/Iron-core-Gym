# 06. Gallery & File Uploads Explained

This feature teaches you how to handle **Files** (Images) by storing them directly in the **Database**.

## Part 1: How to Upload Files (Multer Memory Storage)

We don't save files to the hard drive. We keep them in "Memory" (RAM) temporarily as a **Buffer**, then convert them to text.

**The Setup (`middleware/uploadMiddleware.js`)**:
```javascript
const multer = require('multer');

// Memory Storage: Keeps the file in req.file.buffer
const storage = multer.memoryStorage();
```

---

## Part 2: The Upload Controller (`controllers/galleryController.js`)

**The Logic**:
1.  Multer gives us the **Buffer** (Raw Data).
2.  We convert it to a **Base64 String** (Data URL).
    -   Example: `data:image/jpeg;base64,/9j/4AAQSk...`
3.  We save this HUGE string into the database.

**The Code**:
```javascript
exports.uploadImage = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file!' });

    // Convert Buffer -> Base64 String
    const b64 = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${b64}`;

    // Create DB Entry
    await GalleryImage.create({
        url: imageUrl, // Usage: <img src={imageUrl} />
        title: req.body.title,
        status: 'pending',
        uploadedBy: req.user.id
    });

    res.json({ message: 'Uploaded!' });
};
```

**Pros**:
-   **Easy Backup**: Backup the database, and you backup the images too.
-   **No File System**: Works on any server (Heroku, Render, AWS Lambda) without configuration.

**Cons**:
-   **Database Size**: The database grows very big, very fast.
