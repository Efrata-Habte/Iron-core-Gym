# 02. Database Design Deep Dive

## What is MongoDB and Mongoose?
-   **MongoDB**: A "NoSQL" database. Instead of rows and columns (like Excel), it saves data as **Documents** (JSON-like objects).
-   **Mongoose**: A library that lets us define "Schemas" (Blueprints) for our data in JavaScript.

## 1. The User Schema (`models/User.js`)
This defines what a "User" looks like in our database.

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Tool for encrypting passwords

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'] // Validator: Must exist
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true, // No two users can have the same email
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email' ] // Regex check
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // SECURITY: Don't return the password by default when finding a user
    },
    role: {
        type: String,
        enum: ['member', 'trainer', 'admin'], // Only these values allowed
        default: 'member'
    },
    // RELATIONSHIP: Linking to the Plan Schema
    membershipPlan: {
        type: mongoose.Schema.ObjectId,
        ref: 'Plan'
    },
    // RELATIONSHIP: Linking to the Trainer Schema
    assignedTrainer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Trainer'
    }
});
```

### Key Concepts
1.  **Validation**: `required`, `match`, `minlength` ensure bad data doesn't get saved.
2.  **`select: false`**: This is huge for security. If you run `User.find()`, it won't send the password hashes back to the frontend.
3.  **Relationships (`ref`)**: We store the `_id` of another document. `membershipPlan` doesn't store the plan name "Gold", it stores `65a0f...` (the ID of the Gold Plan).

### Encryption (The "Hook")
We use a "Pre-save Hook" to automatically encrypt passwords.

```javascript
// Run this BEFORE saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next(); // If password didn't change, skip
    }
    // Generate "Salt" (random data)
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
});
```

## 2. The Trainer Schema (`models/Trainer.js`)

```javascript
const TrainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    maxTrainees: { type: Number, default: 5 },
    currentTrainees: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true }
});
```

### Logic: Capacity Management
When a user enrolls, we check if `currentTrainees < maxTrainees`.
The `isAvailable` flag is purely visual helper logic we update in the controller, based on the counts.

## 3. Relationships Visualization

```
[ Collection: users ]           [ Collection: plans ]
{                               {
  _id: "user123",                 _id: "plan999",
  name: "Zeamanuel",              title: "Gold Plan",
  membershipPlan: "plan999" ----> price: 50
}                               }
```
When we want the user's plan details (like price), we use `.populate('membershipPlan')`. This tells Mongoose: "Take this ID, go find the document in Plans, and replace the ID with the actual data."
