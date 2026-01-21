const mongoose = require('mongoose');
const Plan = require('./src/models/Plan');
const Trainer = require('./src/models/Trainer');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/iron-core-gym';

const plans = [
    {
        title: 'BASIC - Self trained',
        monthlyPrice: '1999 Birr/mo',
        yearlyPrice: '20,000 Birr/yr',
        features: [
            'Full gym access (strength & cardio zones)',
            'Locker room & shower access',
            'Open gym hours only',
            'Access to monthly member challenges',
        ],
        badge: 'basic',
        priceNumeric: 1999
    },
    {
        title: 'PRO - Level Up',
        monthlyPrice: '3999 Birr/mo',
        yearlyPrice: '42,000 Birr/yr',
        features: [
            'All BASIC benefits',
            'Unlimited group HIIT classes',
            '1 personal training session per month',
            'Nutrition guidance starter pack',
        ],
        badge: 'pro',
        priceNumeric: 3999
    },
    {
        title: 'TRAINER+ - All in',
        monthlyPrice: '6999 Birr/mo',
        yearlyPrice: '76,000 Birr/yr',
        features: [
            'All PRO benefits',
            '1-on-1 personal training (weekly)',
            'Custom workout & meal plan',
            'Body composition analysis every month',
        ],
        badge: 'plus',
        priceNumeric: 6999
    }
];

const trainers = [
    {
        name: 'ADAMU ELIAS',
        years: 9,
        headline: 'YOU WANT IT?',
        headlineAccent: 'WORK FOR IT!',
        quote: "No one's handing you strength. No one's giving you discipline. It's earned with every drop of sweat —",
        image: '/images/trainer-adamu-11.PNG',
        position: 'right',
        maxTrainees: 5,
        currentTrainees: 0,
        isAvailable: true
    },
    {
        name: 'RUTH ASHENAFI',
        years: 8,
        headline: 'SWEAT NOW.',
        headlineAccent: 'SHINE LATER.',
        quote: "Pain is permission to push harder. You're not broken — you're building.",
        image: '/images/trainer-ruth-2.png',
        position: 'left',
        maxTrainees: 5,
        currentTrainees: 3,
        isAvailable: true
    },
    {
        name: 'STEVE GERARD',
        years: 7,
        headline: 'EARN YOUR',
        headlineAccent: 'REST!',
        quote: 'Go harder. Break your limits. Earn your rest — like a champion.',
        image: '/images/trainer-steve-3.png',
        position: 'right',
        maxTrainees: 5,
        currentTrainees: 5,
        isAvailable: false
    }
];

const User = require('./src/models/User');

const adminUser = {
    name: 'Admin User',
    email: 'admin@ironcore.com',
    password: 'password123',
    role: 'admin'
};

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB for seeding...');
        await Plan.deleteMany();
        await Trainer.deleteMany();
        await User.deleteMany({ email: { $in: ['admin@ironcore.com', 'mebitzeamanuel@gmail.com'] } }); // Clear both admins

        await Plan.insertMany(plans);
        await Trainer.insertMany(trainers);
        await User.create(adminUser);
        await User.create({
            name: 'Super Admin',
            email: 'mebitzeamanuel@gmail.com',
            password: 'password123',
            role: 'admin'
        });

        console.log('Database seeded successfully (including admin)!');
        process.exit();
    })
    .catch(err => {
        console.error('Seeding error:', err);
        process.exit(1);
    });
