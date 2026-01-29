# 09. Contact Form Deep Dive

This feature sends an actual email from the backend.

## The Tool: Nodemailer
We use `nodemailer`, a standard library for sending emails in Node.js.

## The Logic (`controllers/contactController.js`)

```javascript
const nodemailer = require('nodemailer');

// 1. Configure the Transporter (The "Postman")
// We read credentials from .env so they aren't hardcoded
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // e.g., gym@gmail.com
        pass: process.env.EMAIL_PASS  // App Password
    }
});

exports.sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    // 2. Define the Email
    const mailOptions = {
        from: email,                // "From: User's Email"
        to: process.env.EMAIL_USER, // "To: Gym Owner"
        subject: `New Contact from ${name}`,
        text: message
    };

    // 3. Send It!
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email' });
    }
};
```

## Security Note
We never commit `EMAIL_PASS` to GitHub! It always stays in the `.env` file on the server.
