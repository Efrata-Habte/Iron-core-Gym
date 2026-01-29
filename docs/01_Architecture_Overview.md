# 01. Architecture Deep Dive

## What is this project?
This is a **Full-Stack Web Application**. It has two specific parts that talk to each other:

1.  **Frontend (The "Client")**: Built with **React**. This is what runs in your browser (Chrome/Firefox). It handles what you *see* and *click*.
2.  **Backend (The "Server")**: Built with **Node.js**. This runs on a computer (or cloud server) somewhere else. It handles the *logic*, *security*, and *database*.

## The "MERN" Stack (ish)
This project follows a common pattern called **MVC** (Model-View-Controller), though in React apps the "View" is separated.

-   **M**ongoDB: The Database (where we save data).
-   **E**... we replaced "Express" with a **Custom Vanilla Framework** for learning purposes.
-   **R**eact: The UI.
-   **N**ode.js: The Runtime environment for the backend.

---

## The Life of a Request
This is the most important concept to understand. Only the Backend has access to the Database. If the Frontend wants data (like "Show me all trainers"), it must **ask** the Backend.

### Steps
1.  **User Action**: You click "Login" in the React app.
2.  **Frontend Request**: The React code (`authService.js`) uses `fetch()` to send a message across the internet to `http://localhost:5000/api/auth/login`.
3.  **Server Listens**: The Backend is sitting there waiting (`server.js`). It hears the request.
4.  **Routing**: The Backend looks at the path: `/api/auth/login`. It asks, "Who handles this?"
    -   It finds `authRoutes.js`.
    -   Inside that, it finds the specific function: `authController.login`.
5.  **Controller Magic**: The `login` function runs:
    -   It takes the email/password you sent.
    -   It asks the **Database Model** (`User.js`): "Do we have a user with this email?"
    -   It checks the password.
6.  **Response**: If everything is good, the Controller sends a JSON packet back: `200 OK`.
7.  **Frontend Update**: React receives the OK and updates the screen (e.g., changes "Login" to "Logout").

---

## Project Folder Structure Explained

### `/backend/src/`

#### `server.js` (The Spark)
The entry point. It's like turning the key in the ignition. It connects to the database and starts listening for traffic.

#### `app.js` (The Traffic Cop)
This file sees every single request first. It sets up the rules:
-   **CORS**: "Allowed to talk to Frontend".
-   **Body Parser**: "Convert incoming text to JSON objects".
-   **Main Router**: "Send `/api/users` to the User Routes".

#### `core/` (The Engine)
Since we aren't using Express, this folder contains the "framework" code.
-   `Router.js`: The logic that matches URLs to functions.
-   `responseHelpers.js`: Adds methods like `res.json()` to the raw Node response.

#### `controllers/` (The Brains)
Where the actual thinking happens. `authController`, `trainerController`, etc. each handle specific features.

#### `models/` (The Memory)
Defines what data looks like. "A User has a name (string) and email (string)".

#### `routes/` (The Map)
Simple files that say: "If the URL is X, run Controller Y".
