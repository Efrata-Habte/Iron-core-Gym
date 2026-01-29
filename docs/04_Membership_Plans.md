# 04. Membership Plans Deep Dive

This is the simplest feature, but fundamental. It involves reading static data from the database.

## 1. Database Model (`models/Plan.js`)
The plans are "Static Data" (they don't change often), but we store them in the DB so we can update prices without changing code.

```javascript
const PlanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    features: [String], // Array of strings: ["Pool", "Sauna"]
    color: String       // UI Helper: "gold", "silver"
});
```

## 2. Controller (`controllers/planController.js`)

```javascript
exports.getPlans = async (req, res) => {
    // 1. Fetch EVERYTHING from the 'plans' collection
    const plans = await Plan.find();
    
    // 2. Return it as JSON
    res.json(plans);
};
```

## 3. Frontend Integration (`components/plans/PlanCard.jsx`)
The frontend receives the array: `[{ title: 'Basic', price: 20 }, ...]`.
It maps over them:

```jsx
{plans.map(plan => (
    <div className={`card ${plan.color}`}>
        <h3>{plan.title}</h3>
        <h1>${plan.price}</h1>
        <button onClick={() => navigate('/register', { state: { plan } })}>
            Join Now
        </button>
    </div>
))}
```
We use React Router's `state` to pass the selected plan to the Registration page.
