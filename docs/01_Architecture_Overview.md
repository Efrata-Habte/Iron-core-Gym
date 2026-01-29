# 01. Architecture Overview

## Introduction
Iron-core Gym is a web application for managing a modern gym. It allows users to browse plans, view trainers, register for memberships, and interact with an AI chatbot. It includes an Admin Dashboard for managing the business.

## Tech Stack

### Frontend (User Interface)
- **Framework**: React.js (built with Vite)
- **Language**: JavaScript
- **Styling**: Vanilla CSS (modular stylesheets)
- **Key Concepts**:
  - **Component-Based**: The UI is built from reusable pieces (e.g., Buttons, Cards).
  - **Single Page Application (SPA)**: The page never fully reloads; content changes dynamically.

### Backend (Server Logic)
- **Runtime**: Node.js
- **Framework**: Custom "Vanilla" Node.js Framework (No Express.js)
  - Located in `backend/src/core/`.
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT)

## How It Works (The Big Picture)

1.  **Frontend**: The user interacts with the React app in their browser.
2.  **Requests**: When the user clicks "Login" or "View Trainers", the Frontend sends an **HTTP Request** to the Backend API (e.g., `POST /api/auth/login`).
3.  **Backend**:
    - The server receives the request.
    - **Core Router**: The custom router in `src/core/Router.js` processes the path.
    - **Controller**: Runs the business logic (e.g., checks password).
    - **Database**: Reads/Writes data to MongoDB (e.g., finds the user).
4.  **Response**: The backend sends data back (JSON format).
5.  **Update**: The Frontend receives the data and updates the screen.

## Project Structure

```
Iron-core-Gym/
├── frontend/           # The User Interface code
│   ├── src/
│   │   ├── components/ # Reusable UI pieces
│   │   ├── context/    # Global state (Auth, Notifications)
│   │   ├── pages/      # Full pages (Home, Dashboard, etc.)
│   │   └── ...
├── backend/            # The Server code
│   ├── src/
│   │   ├── core/        # CUSTOM FRAMEWORK LOGIC (Router, Helpers)
│   │   ├── controllers/ # Logic for each feature
│   │   ├── models/      # Database Schemas
│   │   ├── routes/      # API Endpoint definitions
│   │   ├── utils/       # Specific logic (Gemini AI)
│   │   ├── app.js       # Main app setup
│   │   └── server.js    # Server entry point
```
