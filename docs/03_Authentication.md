# 03. Authentication

## Purpose
The authentication system allows users to create accounts, sign in, and access protected features (like the dashboard) based on their role (`member`, `admin`, `trainer`).

## Frontend Components
- **`Header.jsx`**: Displays Login/Register buttons or Profile/Logout when logged in.
- **`Hero.jsx`**: Contains the "Join Now" call to action.
- **`context/AuthContext.jsx`**:
  - Stores the `user` object and `token` in the browser's memory.
  - Automatically checks if a user is logged in when the page loads.
  - Provides `login(email, password)` and `logout()` functions to other components.

## Backend Endpoints (`routes/authRoutes.js`)

### 1. Register
- **Endpoint**: `POST /api/auth/register`
- **Controller**: `authController.register`
- **Input**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "plan": "Silver Plan",
    "paymentMethod": "credit_card"
  }
  ```
- **Logic**:
  1.  Validates that inputs are present.
  2.  **Plan Lookup**: Searches the `Plans` database for a plan matching the `plan` name (using Regex).
  3.  **Check User**: Ensures email doesn't already exist.
  4.  **Create**: Saves new User to MongoDB.
  5.  **Token**: Generates a JWT (JSON Web Token) containing the User ID.
- **Output**: Returns the User object and the Token.

### 2. Login
- **Endpoint**: `POST /api/auth/login`
- **Controller**: `authController.login`
- **Logic**:
  1.  Finds user by email.
  2.  **Compare**: Uses `bcrypt` to compare the input password with the stored hash.
  3.  **Token**: Generates a new JWT.
- **Output**: Returns the User object and the Token.

### 3. Get Current User (Protected)
- **Endpoint**: `GET /api/auth/me`
- **Controller**: `authController.getMe`
- **Middleware**: `protect` (from `middleware/authMiddleware.js`)
  - **How `protect` works**:
    1.  Reads the `Authorization` header (`Bearer <token>`).
    2.  Verifies the token using the secret key.
    3.  Finds the user in the DB.
    4.  Attaches the user to `req.user` so the controller can use it.
- **Logic**: Returns the full user profile including populated `membershipPlan` details.

## Flow: User Login
1.  User enters Email/Pass in Frontend.
2.  Frontend calls `authService.login()`.
3.  Backend validates and returns `token`.
4.  Frontend saves `token` to `localStorage`.
5.  Frontend redirects user to Dashboard.
