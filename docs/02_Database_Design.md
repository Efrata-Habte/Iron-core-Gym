# 02. Database Design

## Introduction
The project uses **MongoDB**, a NoSQL database. Instead of tables and rows, we have **Collections** and **Documents** (which look like JSON objects).

We interact with the database using **Mongoose**, which allows us to define "Schemas" (blueprints) for our data.

## Collections

### 1. Users (`users`)
Stores all registered users (Members, Admins, Trainers).

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | User's full name |
| `email` | String | Unique email address |
| `password` | String | Hashed (encrypted) password |
| `role` | String | `member`, `admin`, `super-admin`, or `trainer` |
| `membershipStatus` | String | `active`, `inactive` |
| `membershipPlan` | ObjectId | Link to `plans` collection |
| `assignedTrainer` | ObjectId | Link to `trainers` collection (if enrolled) |

### 2. Trainers (`trainers`)
Stores details about the gym's trainers.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Trainer's name |
| `image` | String | URL to profile image |
| `specialty` | String | e.g., "Weightlifting" |
| `isAvailable` | Boolean | calculated based on capacity |
| `maxTrainees` | Number | Max clients allowed |
| `currentTrainees` | Number | Current active clients |

### 3. Plans (`plans`)
Stores the membership options.

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | e.g., "Silver Plan" |
| `price` | Number | Monthly cost |
| `features` | [String] | List of benefits |

### 4. Gallery (`galleryimages`)
Stores images for the public gallery.

| Field | Type | Description |
| :--- | :--- | :--- |
| `url` | String | Path to the image file |
| `caption` | String | Title/Description |
| `status` | String | `pending` (needs approval) or `approved` |
| `uploadedBy` | ObjectId | User who uploaded it |

## Relationships

1.  **User -> Plan**: A user has one `membershipPlan`. We store the Plan's ID in the User document.
2.  **User -> Trainer**: A user can be assigned to one `assignedTrainer`. We store the Trainer's ID.
3.  **Trainer -> Users (Implicit)**: We can find all trainees for a trainer by searching Users where `assignedTrainer == TrainerID`.

## Common Flows

### User Registration
1.  **Input**: User sends Name, Email, Password, Plan Name.
2.  **Lookup**: Backend finds the `Plan` document by name.
3.  **create**: New `User` document created with `membershipPlan = Plan._id`.

### Enrolling with a Trainer
1.  **Check**: Check if `Trainer.currentTrainees < Trainer.maxTrainees`.
2.  **Update User**: Set `User.assignedTrainer = Trainer._id`.
3.  **Update Trainer**: Increment `Trainer.currentTrainees`.
