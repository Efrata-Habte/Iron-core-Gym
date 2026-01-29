# 06. Gallery

## Purpose
A visual showcase of the gym environment. Users can view images, and registered users can upload their own gym photos (which require admin approval).

## Frontend Components
- **`about/Gallery.jsx`**: Main gallery grid. Fetches images.
- **`ui/ImageModal.jsx`**: Popup when clicking an image to view it full-size.
- **`ui/UploadModal.jsx`**: Form for users to upload new images.

## Backend Endpoints (`routes/galleryRoutes.js`)

### 1. Get Public Images
- **Endpoint**: `GET /api/gallery`
- **Controller**: `galleryController.getApprovedImages`
- **Logic**: Returns only images where `status === 'approved'`.

### 2. Upload Image (Protected)
- **Endpoint**: `POST /api/gallery/upload`
- **Controller**: `galleryController.uploadImage`
- **Middleware**: `protect`, `withUpload('image')`
- **Logic**:
  1.  **File Handling**: `multer` middleware saves the uploaded file to `backend/public/uploads/`.
  2.  **Database**: Creates a new `GalleryImage` document.
  3.  **Status**: Sets `status = 'pending'` (default).
  4.  **Response**: Returns the new image object.

### 3. Approve/Reject (Admin Only)
- **Endpoint**: `PATCH /api/gallery/:id/status`
- **Controller**: `galleryController.updateImageStatus`
- **Logic**: Admin changes status to 'approved' or 'rejected'.

## Database Schema (`models/GalleryImage.js`)
- `url`: String (path to image, e.g., `/uploads/file.jpg`)
- `caption`: String
- `status`: String (`pending`, `approved`, `rejected`)
- `uploadedBy`: ObjectId (User ref)

## Flow: Uploading an Image
1.  **User** clicks "Upload" in the Gallery section.
2.  **File Select**: User chooses a file and enters a caption.
3.  **Submit**: Frontend sends a `Multipart/Form-Data` request to the backend.
4.  **Backend**:
    - Saves file to disk.
    - Saves entry to DB (`status: pending`).
5.  **Feedback**: User sees "Upload successful! Pending approval."
6.  **Visibility**: Image does NOT appear in the main gallery yet.
7.  **Admin**: Logs in, sees the pending request, and clicks "Approve".
8.  **Public**: Image generates in the main gallery.
