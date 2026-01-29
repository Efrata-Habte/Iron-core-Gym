# 03. Authentication Service Explained

Authentication is "Who are you?". Authorization is "Are you allowed to be here?".

## The Core Concept: Tokens (JWT)

We don't keep a list of logged-in users on the server. Instead, when you log in, we give you a digital ID card called a **JSON Web Token (JWT)**.

1.  **Login**: You send Password. We verify it. We verify YOU.
2.  **Issue Token**: We create a signed token. It implies: "This user is ID 123 and they are an Admin".
3.  **Future Requests**: You attach the token to every request. "Here is my ID card, let me in!"

---

## 1. Hashing Passwords (Security)
We **NEVER** store plain passwords like "pizza123". If we get hacked, everyone is compromised. We store a "Hash" (like a mathematical fingerprint).

**The Logic (`models/User.js`)**:
```javascript
UserSchema.pre('save', async function(next) {
    // Generate some random noise ("Salt")
    const salt = await bcrypt.genSalt(10);
    // Mix the password with salt and crush it
    this.password = await bcrypt.hash(this.password, salt);
});
```
*Result in DB*: `$2a$10$X7...` (Unreadable gibberish).

---

## 2. The Middleware (The Bouncer)
This is the most important file: `middleware/authMiddleware.js`.
It runs *before* the controller logic.

**The Code**:
```javascript
exports.protect = async (req, res, next) => {
    let token;

    // 1. Check if the "Authorization" header exists
    if (req.headers.authorization) {
        // It looks like "Bearer eyJhbGc..."
        token = req.headers.authorization.split(' ')[1]; // Get just the code
    }

    if (!token) return res.status(401).json({ message: 'No ticket, no entry!' });

    try {
        // 2. Verify: Is this a valid token from US?
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach User: Find the user and stick it to the request
        req.user = await User.findById(decoded.id);
        
        // 4. NEXT: Allow them through to the Controller
        next();
    } catch (err) {
        res.status(401).json({ message: 'Fake ticket!' });
    }
};
```

**Breakdown**:
-   `req.headers`: Where the browser sends metadata.
-   `jwt.verify`: Checks the digital signature. If you changed even one letter of the token, this fails.
-   `next()`: The green light. "Go right ahead, sir."

---

## 3. Login Controller (`authController.js`)
It puts it all together.

```javascript
exports.login = async (req, res) => {
    // 1. Check Credentials
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password); // Compare Hash
    
    if (!match) return Error("Wrong password");

    // 2. Creates the Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // 3. Send it
    res.json({ token, user });
};
```
