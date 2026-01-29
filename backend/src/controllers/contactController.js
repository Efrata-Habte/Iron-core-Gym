const nodemailer = require('nodemailer');

exports.sendContactEmail = async (req, res) => {
    try {
        const { name, email, msg } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Iron-Core-Gym Contact Form: Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${msg}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
