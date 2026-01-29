# 08. Admin Dashboard Deep Dive

The Admin Dashboard is where business logic gets complex. We need to calculate revenue and manage users.

## 1. Calculating Stats (`controllers/statsController.js`)
We use **MongoDB Aggregation Pipeline**. This is like SQL `JOIN` and `SUM` but for NoSQL.

```javascript
exports.getStats = async (req, res) => {
    // 1. Simple Counts
    const totalUsers = await User.countDocuments();
    const activeMembers = await User.countDocuments({ membershipStatus: 'active' });

    // 2. Complex Calculation: Revenue
    // Problem: Users have a Plan ID. Plans have a Price.
    // We need to:
    //   a. Find all active users.
    //   b. "Lookup" (Join) the Plan details for each user.
    //   c. Sum up the prices.

    const revenueData = await User.aggregate([
        // Step A: Filter
        { $match: { membershipStatus: 'active' } },

        // Step B: Join with 'plans' collection
        {
            $lookup: {
                from: 'plans',           // Collection to join
                localField: 'membershipPlan', // Field in User
                foreignField: '_id',     // Field in Plan
                as: 'planDetails'        // Result array
            }
        },

        // Step C: Flatten the array (User has 1 plan, but lookup returns an array)
        { $unwind: '$planDetails' },

        // Step D: Group and Sum
        {
            $group: {
                _id: null, // Group everything into one bucket
                totalRevenue: { $sum: '$planDetails.price' } // Add up prices
            }
        }
    ]);

    const revenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.json({ totalUsers, activeMembers, revenue });
};
```

## 2. Managing Users (`controllers/userController.js`)
Admins can toggle a user's status (`active`/`inactive`).

```javascript
exports.updateUserStatus = async (req, res) => {
    // Request comes to: PATCH /api/users/123
    // Body: { membershipStatus: "inactive" }

    const user = await User.findById(req.params.id);
    
    // Update the field
    user.membershipStatus = req.body.membershipStatus;
    await user.save();

    res.json(user);
};
```
