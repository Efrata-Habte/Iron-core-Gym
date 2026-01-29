# 03. Authentication Deep Dive

Authentication is how we verify "Who are you?" (Login).
Authorization is "Are you allowed to do this?" (Permissions).

## The Key: JSON Web Tokens (JWT)
We do not store "sessions" in the database. Instead, when you log in, we give you a generic "Badge" called a **Token**.
-   The Token works like a stamp on your hand at a club.
-   It contains encrypted data: `{ id: "user123", role: "admin" }`.
-   You typically store this in `localStorage` in the browser.

## 1. The Login Logic (`controllers/authController.js`)

```javascript
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // 1. Find User by Email
    // Explicitly ask for password because select:false hides it
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Check Password
    // Uses bcrypt to compare the plain text "123456" with the encrypted hash
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Create Token
    const token = jwt.sign(
        { id: user._id, role: user.role }, // Payload
        process.env.JWT_SECRET,            // Secret Key (Private!)
        { expiresIn: '30d' }
    );

    // 4. Send Response
    res.status(200).json({ success: true, token });
};
```

## 2. Protecting Routes (`middleware/authMiddleware.js`)
How do we stop random people from accessing `/api/dashboard`? We use Middleware. Middleware acts like a bouncer; it runs *before* the controller.

```javascript
exports.protect = async (req, res, next) => {
    let token;

    // 1. Check for Header
    // The Frontend sends: "Authorization: Bearer <token_string>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token string
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify Token
            // If the secret key doesn't match, this throws an error (Fake token!)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Find User
            // Get the user from the ID in the token
            req.user = await User.findById(decoded.id).select('-password');

            // 4. NEXT!
            // Move to the actual controller function
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No token, run away!' });
    }
};
```

### Admin Logic (`exports.admin`)
This is a second middleware checking the role.
```javascript
exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // Pass
    } else {
        res.status(403).json({ message: 'Admin only!' }); // Fail
    }
}
```

## 3. Frontend Integration (`context/AuthContext.jsx`)
In React, we wrap our app in a Context.
1.  **On Load**: Check `localStorage` for a token.
2.  If found, set `user` state to "Logged In".
3.  **Logout**: Delete token from `localStorage` and set `user = null`.
