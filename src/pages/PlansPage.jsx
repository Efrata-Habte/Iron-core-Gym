import PlanCard from '../components/plans/PlanCard'

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
        backgroundImage: '/images/npng.jpg',
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
        backgroundImage: '/images/p1.png',
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
        backgroundImage: '/images/p3.jpg',
    },
]

export default function PlansPage() {
    return (
        <section className="flex flex-wrap justify-evenly items-center px-2 pt-8">
            {plans.map((plan) => (
                <PlanCard key={plan.title} {...plan} />
            ))}
        </section>
    )
}
