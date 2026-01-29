# 04. Membership Plans

## Purpose
Displays the available gym membership tiers (e.g., Basic, Silver, Gold). Users select a plan during registration.

## Frontend Components
- **`plans/PlanCard.jsx`**: Displays a single plan's price and features.
- **`home/PlansSection.jsx`**: Fetches the list of plans and renders a grid of `PlanCard`s.

## Backend Endpoints (`routes/planRoutes.js`)

### 1. Get All Plans
- **Endpoint**: `GET /api/plans`
- **Controller**: `planController.getPlans`
- **Logic**:
  - Simple query: `Plan.find()`
  - Fetches all plan documents from the `plans` collection.
- **Output**: Array of Plan objects.
  ```json
  [
    {
      "title": "Basic Plan",
      "price": 29.99,
      "features": ["Gym Access", "Locker Room"]
    },
    ...
  ]
  ```

## Database Schema (`models/Plan.js`)
- **`title`**: String (Unique)
- **`price`**: Number
- **`features`**: Array of Strings
- **`color`**: String (for UI styling)

## Flow: Choosing a Plan
1.  **Home Page Loads**: `PlansSection` calls `GET /api/plans`.
2.  **Display**: Plans are shown to the user.
3.  **Selection**: When a user clicks "Join Now" on a plan, the plan's title is passed to the Registration Form (often via URL query param or state).
4.  **Register**: The backend receives the plan title and links the new user to that specific Plan ID.
