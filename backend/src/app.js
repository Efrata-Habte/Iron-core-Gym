const express = require('express');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require('./middleware/passport')(passport);

// Static folder for uploads
app.use('/uploads', express.static('public/uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/trainers', require('./routes/trainerRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

app.get('/', (req, res) => {
    res.send('Gym API is running...');
});

// Error Handler
app.use(require('./middleware/errorHandler'));

module.exports = app;
