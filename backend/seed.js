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
        badge: 'basic'
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
        badge: 'pro'
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
        badge: 'plus'
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
        isAvailable: true
    },
    {
        name: 'RUTH ASHENAFI',
        years: 7,
        headline: 'SWEAT NOW.',
        headlineAccent: 'SHINE LATER.',
        quote: "Pain is permission to push harder. You're not broken — you're building.",
        image: '/images/trainer-ruth-2.png',
        position: 'left',
        isAvailable: false
    },
    {
        name: 'STEVE GERARD',
        years: 8,
        headline: 'EARN YOUR',
        headlineAccent: 'REST!',
        quote: 'Go harder. Break your limits. Earn your rest — like a champion.',
        image: '/images/trainer-steve-3.png',
        position: 'right',
        isAvailable: true
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
        await User.deleteMany({ email: 'admin@ironcore.com' }); // Only delete admin if it exists

        await Plan.insertMany(plans);
        await Trainer.insertMany(trainers);
        await User.create(adminUser);

        console.log('Database seeded successfully (including admin)!');
        process.exit();
    })
    .catch(err => {
        console.error('Seeding error:', err);
        process.exit(1);
    });
