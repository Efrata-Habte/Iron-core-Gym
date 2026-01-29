# 05. Trainers & Enrollment Explained

This feature shows how we handle **Business Logic**.
The logic is: "You can only enroll if the trainer has space."

## 1. The Trainer Model (`models/Trainer.js`)

We need to track how many people are enrolled.

```javascript
const TrainerSchema = new mongoose.Schema({
    name: String,
    maxTrainees: { type: Number, default: 5 }, // The Limit
    currentTrainees: { type: Number, default: 0 }, // The Counter
    isAvailable: { type: Boolean, default: true } // The Flag
});
```

---

## 2. Enrollment Logic (`controllers/trainerController.js`)

This is the code that runs when you click "Enroll".

**The English Explanation**:
1.  Check if the Trainer exists.
2.  Check if the Trainer is FULL (`current >= max`). If so, stop.
3.  Check if the User already has a trainer. If so, stop.
4.  If all good:
    -   Tell the User "This is your trainer".
    -   Tell the Trainer "You have +1 student".
    -   Recalculate if the trainer is now full.

**The Code**:
```javascript
exports.enrollInTraining = async (req, res) => {
    // 1. Get the Data
    const trainerId = req.params.id; // URL: /api/trainers/enroll/123
    const userId = req.user.id;      // From the Token

    // 2. Fetch from DB
    const trainer = await Trainer.findById(trainerId);
    const user = await User.findById(userId);

    // 3. LOGIC: Is it full?
    if (trainer.currentTrainees >= trainer.maxTrainees) {
        return res.status(400).json({ message: 'Sorry, full!' });
    }

    // 4. LOGIC: Already enrolled?
    if (user.assignedTrainer) {
        return res.status(400).json({ message: 'You already have one!' });
    }

    // 5. Update Database
    user.assignedTrainer = trainerId;
    trainer.currentTrainees += 1; // Increase count

    // Update the "Available" flag automatically
    // If 4 < 5, true. If 5 < 5, false.
    trainer.isAvailable = trainer.currentTrainees < trainer.maxTrainees;

    // Save both
    await user.save();
    await trainer.save();

    res.json({ success: true });
};
```

---

## 3. Frontend Button (`TrainerCard.jsx`)

The button is smart. It disables itself if `isAvailable` is false.

```javascript
// React Component
<button 
    disabled={!trainer.isAvailable} // Grey out if false
    onClick={handleEnroll}
>
    {trainer.isAvailable ? "Enroll Now" : "Fully Booked"}
</button>
```
