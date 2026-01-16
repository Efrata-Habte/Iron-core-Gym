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
    },
    {
        name: 'RUTH ASHENAFI',
        years: 7,
        headline: 'SWEAT NOW.',
        headlineAccent: 'SHINE LATER.',
        quote: "Pain is permission to push harder. You're not broken — you're building.",
        image: '/images/trainer-ruth-2.png',
        position: 'left',
    },
    {
        name: 'STEVE GERARD',
        years: 8,
        headline: 'EARN YOUR',
        headlineAccent: 'REST!',
        quote: 'Go harder. Break your limits. Earn your rest — like a champion.',
        image: '/images/trainer-steve-3.png',
        position: 'right',
    },
]

export default function TrainersSection() {
    return (
        // section.trainers-section: flex column, align-items center, padding: var(--section-side-padding) = min(4%, 8rem)
        <section className="flex flex-col items-center px-[min(4%,8rem)]">
            <SectionHeading centered>
                OUR <span className="red-text">TRAINERS</span>
            </SectionHeading>

            {/* Trainer Cards with floating balls */}
            <div className="w-full flex flex-col items-center relative">
                {trainers.map((trainer, index) => (
                    <div key={trainer.name} className={`relative w-full flex flex-col items-center ${index === 0 ? 'first' : index === 2 ? 'third' : ''
                        }`}>
                        <TrainerCard {...trainer} />
                        {/* .first .b1: 130px, left: 0, top: -30% */}
                        {index === 0 && <FloatingBall color="black" size={130} top="-30%" left="0" />}
                        {/* .third .b2: 100px, bottom: 0, left: 0 */}
                        {index === 2 && <FloatingBall color="red" size={100} bottom="0" left="0" />}
                    </div>
                ))}
            </div>

            {/* .join-cta: flex column, align-items center, gap: 1.3rem, text-align center */}
            <div className="flex flex-col items-center gap-[1.3rem] text-center mt-8">
                <p className="max-w-md">
                    Don't waste your time, start your transformation{' '}
                    <span className="red-text">RIGHT NOW!</span>
                </p>
                <Button to="/plans">Get Membership</Button>
            </div>
        </section>
    )
}
