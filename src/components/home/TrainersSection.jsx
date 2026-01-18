import SectionHeading from '../ui/SectionHeading'
import TrainerCard from './TrainerCard'
import Button from '../ui/Button'
import FloatingBall from '../ui/FloatingBall'


const trainers = [
    {
        name: 'ADAMU ELIAS',
        years: 9,
        headline: 'YOU WANT IT?',
        headlineAccent: 'WORK FOR IT!',
        quote: "No one's handing you strength. No one's giving you discipline. It's earned with every drop of sweat —",
        image: '/images/trainer-adamu-11.PNG',
        position: 'right',
        className: 'first'
    },
    {
        name: 'RUTH ASHENAFI',
        years: 7,
        headline: 'SWEAT NOW.',
        headlineAccent: 'SHINE LATER.',
        quote: "Pain is permission to push harder. You're not broken — you're building.",
        image: '/images/trainer-ruth-2.png',
        position: 'left',
        className: 'second'
    },
    {
        name: 'STEVE GERARD',
        years: 8,
        headline: 'EARN YOUR',
        headlineAccent: 'REST!',
        quote: 'Go harder. Break your limits. Earn your rest — like a champion.',
        image: '/images/trainer-steve-3.png',
        position: 'right',
        className: 'third'
    },
]

export default function TrainersSection() {
    return (
        <section className="trainers-section">
            <SectionHeading centered>
                OUR <span className="red-text">TRAINERS</span>
            </SectionHeading>

            {/* Floating balls belonging to the section */}
            <FloatingBall color="black" size={130} top="15%" left="5%" />
            <FloatingBall color="red" size={100} bottom="10%" right="5%" />

            {trainers.map((trainer, index) => (
                <TrainerCard key={trainer.name} {...trainer} />
            ))}


            <div className="join-cta">
                <p>
                    Don't waste your time, start your transformation{' '}
                    <span className="red-text">RIGHT NOW!</span>
                </p>
                <Button to="/plans">Get Membership</Button>
            </div>
        </section>
    )
}
