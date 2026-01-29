# 09. Contact Form (Emails) Explained

This feature sends an email from the User to the Gym Owner.

## The Tool: Nodemailer
Node.js can't send emails itself. It needs a Postman. We use **Nodemailer**.

**The Setup (`.env`)**:
```env
EMAIL_USER=mygym@gmail.com
EMAIL_PASS=supersecretpassword
```
*Note: We use App Passwords, not your real Gmail password.*

---

## The Request Flow

1.  **Frontend**: User fills out the form.
    ```javascript
    await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
            name: "John",
            message: "Do you have a pool?"
        })
    });
    ```

2.  **Backend Controller (`controllers/contactController.js`)**:
    
    **English Explanation**:
    -   Create a "Transporter" (Login to Gmail).
    -   Create the Email Object (Who is it from? Who is it to? Subject?).
    -   Send it.

    **The Code**:
    ```javascript
    exports.sendContactEmail = async (req, res) => {
        // 1. Setup Postman
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 2. Draft the Letter
        const mailOptions = {
            from: req.body.email, // User's email
            to: process.env.EMAIL_USER, // Gym's email
            subject: `New Message from ${req.body.name}`,
            text: req.body.message
        };

        // 3. Send
        await transporter.sendMail(mailOptions);
        
        res.json({ message: "Sent!" });
    };
    ```
