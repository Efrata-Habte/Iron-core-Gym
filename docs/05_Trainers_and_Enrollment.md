# 05. Trainers and Enrollment

## Purpose
Users can view professional trainers and enroll with them for personalized coaching.
Trainers have a limited capacity (`maxTrainees`). If full, users cannot enroll and simple see "Unavailable".

## Frontend Components
- **`home/TrainersSection.jsx`**: Displays top 3 trainers on the home page.
- **`TrainersPage.jsx`**: A dedicated page listing ALL trainers with detailed cards.
- **`home/TrainerCard.jsx`**:
  - Displays Trainer Image, Name, and Status.
  - Contains the **"Enroll Now"** button.
  - Handles the API call to enroll.
  - Shows "Full" badge if `!isAvailable`.

## Backend Endpoints (`routes/trainerRoutes.js`)

### 1. Get All Trainers
- **Endpoint**: `GET /api/trainers`
- **Controller**: `trainerController.getTrainers`
- **Logic**: Returns all trainer documents.

### 2. Enroll with Trainer (Protected)
- **Endpoint**: `POST /api/trainers/enroll/:id`
- **Controller**: `trainerController.enrollInTraining`
- **Middleware**: `protect` (Must be logged in)
- **Logic**:
  1.  **Find Trainer**: Looks up the trainer by ID.
  2.  **Capacity Check**:
      ```javascript
      if (trainer.currentTrainees >= trainer.maxTrainees) {
          return Error("Full capacity");
      }
      ```
  3.  **User Check**: Ensures the user isn't *already* enrolled with someone.
  4.  **Update**:
      - `User.assignedTrainer` = new Trainer ID.
      - `Trainer.currentTrainees` += 1.
      - `Trainer.isAvailable` = recalculated (false if full).
  5.  **Save**: Both documents are saved.

### 3. Create Trainer (Admin Only)
- **Endpoint**: `POST /api/trainers`
- **Controller**: `trainerController.createTrainer`
- **Middleware**: `protect`, `admin`
- **Logic**: Creates a new trainer profile. Can include an image upload (handled by `multer`).

## Database Schema (`models/Trainer.js`)
- `name`: String
- `image`: String (URL)
- `maxTrainees`: Number (default 5)
- `currentTrainees`: Number (default 0)
- `isAvailable`: Boolean (auto-updated based on capacity)

## Flow: Enrollment
1.  **User** logs in.
2.  **User** browses the Trainers page.
3.  **Click**: User clicks "Enroll" on a trainer who is available.
4.  **API Call**: Frontend sends `POST /api/trainers/enroll/123` with the Auth Token.
5.  **Backend**:
    - Verifies token.
    - Checks capacity.
    - Assigns user.
    - Updates stats.
6.  **Response**: "Successfully enrolled!".
7.  **UI Update**: Button changes to "Enrolled".
