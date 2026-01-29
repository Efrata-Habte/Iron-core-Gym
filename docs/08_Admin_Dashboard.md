# 08. Admin Dashboard

## Purpose
A restricted area for Gym Administrators to view insights and manage the business.

## Frontend Components
- **`admin/AdminStats.jsx`**: Shows "Total Users", "Active Members", and "Revenue".
- **`admin/AdminUsers.jsx`**: Table of all registered users. Allows toggling membership status.
- **`admin/AdminTrainerForm.jsx`**: Form to add new trainers.
- **`admin/AdminGalleryApproval.jsx`**: Review pending image uploads.

## Backend Endpoints

### 1. Stats (`routes/statsRoutes.js`)
- **Endpoint**: `GET /api/stats`
- **Controller**: `statsController.getStats`
- **Middleware**: `protect` + `admin`
- **Logic**:
  - Counts total users.
  - Counts active members.
  - Calculates revenue: Sum of `Plan.price` for all active members.
    - Uses MongoDB Aggregation to `$lookup` Plan details for each user and `$sum` the prices.

### 2. User Management (`routes/userRoutes.js`)
- **Endpoint**: `PATCH /api/users/:id`
- **Controller**: `userController.updateUserStatus`
- **Logic**: Toggles `membershipStatus` between 'active' and 'inactive'.

### 3. Gallery Approval (`routes/galleryRoutes.js`)
- **Endpoint**: `PATCH /api/users/:id/status`
- **Logic**: Discussed in [Gallery Documentation](./06_Gallery.md).

## Flow: Loading the Dashboard
1.  **Admin** logs in.
2.  **Navigation**: Clicks "Admin Dashboard" (only visible if role='admin').
3.  **Fetch**: Frontend calls `GET /api/stats`.
4.  **Display**: Cards show live data.

---

# 09. Contact Form

## Purpose
Allows prospective members to get in touch with the gym.

## Frontend Components
- **`home/ContactSection.jsx`**: A form with Name, Email, and Message fields.

## Backend Endpoints (`routes/contactRoutes.js`)

### 1. Send Email
- **Endpoint**: `POST /api/contact`
- **Controller**: `contactController.sendContactEmail`
- **Logic**:
  1.  Receives form data.
  2.  Uses **Nodemailer** to send an email to the gym's official address (`process.env.EMAIL_USER`).
  3.  **Response**: "Message sent successfully".

## Tools
- **Nodemailer**: A Node.js library for sending emails easily.
- **Gmail (or SMTP)**: configured in `.env` to actually deliver the mail.
