# 04. Membership Plans Explained

This is a simple "Read-Only" feature. We just want to show the list of prices.

## 1. The Strategy
We could just hardcode the prices in the React code.
*Problem*: If we change the price, we have to re-deploy the whole website.
*Solution*: Store prices in the Database. When the Backend answers, the Frontend updates instantly.

## 2. The Model (`models/Plan.js`)
It's just a list of items.

```javascript
const PlanSchema = new mongoose.Schema({
    title: String,  // "Gold"
    price: Number,  // 50
    features: [String], // ["Sauna", "Pool"]
    color: String   // "yellow" (for the CSS class)
});
```

## 3. The Controller (`controllers/planController.js`)
It's very boring, which is good!

```javascript
exports.getPlans = async (req, res) => {
    // 1. Find Every single plan
    const plans = await Plan.find();
    
    // 2. Send distinct JSON
    res.json(plans);
};
```

## 4. Frontend Usage
React receives the list and loops over it.

```jsx
// Frontend (Concept)
const [plans, setPlans] = useState([]);

// On Load, fetch data
useEffect(() => {
    fetch('/api/plans')
        .then(res => res.json())
        .then(data => setPlans(data));
}, []);

// Render
return (
    <div className="grid">
        {plans.map(plan => (
            <div className={`card ${plan.color}`}>
                <h1>{plan.title}</h1>
                <p>${plan.price}</p>
            </div>
        ))}
    </div>
);
```
