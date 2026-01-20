import Hero from '../components/home/Hero'
import WithUs from '../components/home/WithUs'
import TrainersSection from '../components/home/TrainersSection'
import Chatbot from '../components/home/Chatbot'
import '../styles/index.css'

export default function HomePage() {
    return (
        <>
            <Hero />
            <WithUs />
            <TrainersSection />
            <Chatbot />
        </>
    )
}
