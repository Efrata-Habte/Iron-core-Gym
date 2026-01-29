# 01. Architecture Deep Dive (Tutorial)

## The Big Picture: How Web Apps Work

Imagine a restaurant.
1.  **The Customer (You/Frontend)**: You sit at a table and look at the menu. You decide what you want.
2.  **The Waiter (API Request)**: You can't go into the kitchen yourself. You tell the waiter "I want the Steak".
3.  **The Kitchen (Backend)**: The waiter tells the chef. The chef checks the fridge (Database), cooks the meal (Logic), and puts it on a plate.
4.  **The Waiter (Response)**: The waiter brings the plate back to you.

In this project:
-   **Frontend (React)** is the Customer.
-   **Backend (Node.js)** is the Kitchen.
-   **Database (MongoDB)** is the Fridge.

---

## 2. The Project Folder Structure

We organize our code to keep things clean.

### `backend/src/`

-   **`server.js`**: The ignition key. Run this to start the kitchen.
-   **`app.js`**: The Front Desk. It greets everyone who enters.
-   **`core/`**: The "Custom Framework". Since we aren't using a pre-made kit like Express, we built our own tools here.
-   **`controllers/`**: The Chefs. `authController` handles logins, `trainerController` handles trainers.
-   **`models/`**: The Recipes. Keeps standards consistent (e.g., "A User must have a name").
-   **`routes/`**: The Menu. Lists what you can order (`/login`, `/register`).

---

## 3. The Life of a Request (Step-by-Step)

Let's see what happens when you click **"Login"**.

### Step 1: Frontend Asks
The React code sends a message.

```javascript
// Frontend Code (simplified)
fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'bob@gmail.com', password: '123' })
});
```
*Translation: "Hey Server! Here is Bob's info. Log him in!"*

### Step 2: Server Receives (`app.js`)
The message arrives at the backend.
1.  **CORS**: Checks if the request came from a trusted website (our frontend).
2.  **Body Parser**: The data comes in as a messy stream of text. We convert it into a nice Object: `{ email: 'bob...', password: '123' }`.

### Step 3: Routing (`routes/authRoutes.js`)
The server looks at the URL: `/api/auth/login`.
It checks its map:
> "Oh, `/api/auth` goes to the Auth Router. And `/login` goes to the `login` controller."

### Step 4: Logic (`controllers/authController.js`)
The code runs:
1.  Look for Bob in the database.
2.  Check if "123" matches his hidden password.
3.  If yes, create a "Badge" (Token).

### Step 5: Response
The server sends the Token back.
> "Here is your badge. Show this next time you want to see the dashboard."

### Step 6: Frontend Updates
React sees the success message and changes the screen from the Login Form to the User Profile.
