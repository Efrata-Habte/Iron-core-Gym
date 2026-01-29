# 05. Trainers & Enrollment Deep Dive

This feature allows users to pick a trainer. The complexity here is **Capacity Management**. A trainer can only take 5 people.

## Controller Logic (`controllers/trainerController.js`)

### `enrollInTraining(req, res)`
This function handles the "Enroll" button click.

```javascript
exports.enrollInTraining = async (req, res) => {
    // 1. Get IDs
    const trainerId = req.params.id; // From URL: /api/trainers/enroll/123
    const userId = req.user.id;      // From Token (via protect middleware)

    // 2. Find Trainer
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });

    // 3. CHECK CAPACITY (Business Logic)
    if (trainer.currentTrainees >= trainer.maxTrainees) {
        // If full, stop immediately!
        return res.status(400).json({ message: 'Trainer is full!' });
    }

    // 4. Find User & Check if already enrolled
    const user = await User.findById(userId);
    if (user.assignedTrainer) {
        return res.status(400).json({ message: 'You already have a trainer!' });
    }

    // 5. UPDATE EVERYONE
    // Assign trainer to user
    user.assignedTrainer = trainer._id;
    await user.save();

    // Increment trainer count
    trainer.currentTrainees += 1;
    // Auto-update availability flag
    trainer.isAvailable = trainer.currentTrainees < trainer.maxTrainees;
    await trainer.save();

    // 6. Success!
    res.json({ message: `Enrolled with ${trainer.name}` });
};
```

## Frontend: Handling the UI (`home/TrainerCard.jsx`)
The frontend is "dumb" - it just displays what the backend tells it.

```javascript
// Function inside React Component
const handleEnroll = async () => {
    // Call the API
    const res = await fetch(`/api/trainers/enroll/${trainer._id}`, { ... });

    if (res.ok) {
        // Change button to "Enrolled"
        setEnrolled(true);
    } else {
        // Show error (e.g., "Trainer is full!")
        alert(error.message);
    }
}
```
