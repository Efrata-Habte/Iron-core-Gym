# 08. Admin & Aggregation Explained

This doc explains **Data Analysis**.
The Dashboard doesn't just show data; it **Calculates** it.

## The Problem
We want to know the **Total Revenue**.
-   User A is on the "Gold Plan" ($50).
-   User B is on the "Silver Plan" ($30).
-   The `User` document only knows the Plan ID (`plan: "123"`), not the price (`$50`).

To get the total, we need to:
1.  Find all Users.
2.  Look up their Plan Price.
3.  Add them all together.

---

## 2. The Solution: Aggregation Pipeline (`controllers/statsController.js`)

MongoDB allows a "Pipeline" of steps. Imagine a factory conveyor belt.

**The English Explanation**:
1.  **Match**: Filter out inactive users. Only keep "Active" ones.
2.  **Lookup**: Go to the `plans` collection. Find the plan that matches `membershipPlan` ID. Copy that plan's data into this user's document.
3.  **Unwind**: The `lookup` step creates an array (because there *could* be multiple matches). We know there is only 1. We "Unwind" (flatten) it into a single object.
4.  **Group**: Put everyone in one big bucket (`_id: null`) and SUM the `price` field.

**The Code**:
```javascript
exports.getStats = async (req, res) => {
    const revenueData = await User.aggregate([
        // Step 1: Filter
        { $match: { membershipStatus: 'active' } },

        // Step 2: Join
        {
            $lookup: {
                from: 'plans', // Target collection
                localField: 'membershipPlan', // User field
                foreignField: '_id', // Plan field
                as: 'planDetails' // Where to put the result
            }
        },

        // Step 3: Flatten
        { $unwind: '$planDetails' },

        // Step 4: Calculate
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$planDetails.price' }
            }
        }
    ]);
    
    // Send back the result (or 0 if no users)
    const revenue = revenueData[0]?.totalRevenue || 0;
    res.json({ revenue });
};
```
