# 02. Database Design Explained

This project uses **MongoDB**. In a normal SQL database (like Excel), you have "Rows" and "Columns". In MongoDB, we have **"Collections"** (Tables) and **"Documents"** (Rows).

A Document looks exactly like a JSON object.

## 1. The Schema (The Blueprint)
We use a library called **Mongoose**. It lets us define "What a User looks like". This is called a Schema.

**The Code (`models/User.js`)**:
```javascript
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        unique: true // No duplicate emails allowed!
    },
    role: {
        type: String,
        enum: ['member', 'trainer', 'admin'], // Only these 3 words allowed
        default: 'member'
    },
    // RELATIONSHIP (Foreign Key)
    assignedTrainer: {
        type: mongoose.Schema.ObjectId, // Stores an ID like "65a2b..."
        ref: 'Trainer' // Points to the 'Trainer' collection
    }
});
```

**Breakdown**:
-   `required`: If you try to save a user without a name, it throws an error.
-   `enum`: Validation that ensures you can't be a "super-hero" role.
-   `ref`: This is how we link data. We satisfy relationships by storing the *ID* of the related item.

---

## 2. Common Operations (How to use it)

### Create Logic
```javascript
// userController.js
await User.create({
    name: "John",
    email: "john@test.com"
});
```
This saves a new document to the database.

### Find Logic
```javascript
// Find all users who are admins
const admins = await User.find({ role: 'admin' });
```

### Populate (The Magic Join)
When we get a user, we normally just get the Trainer's ID (`"65a2b..."`). If we want the Trainer's *Name*, we use `.populate()`.

```javascript
const user = await User.findById(id).populate('assignedTrainer');
```

**Result**:
```javascript
{
    name: "John",
    assignedTrainer: {
        // Mongoose fetched this automatically!
        _id: "65a2b...",
        name: "Arnold",
        specialty: "Bodybuilding"
    }
}
```
