import '../styles/index.css'
import Hero from '../components/home/Hero'
import WithUs from '../components/home/WithUs'
import TrainersSection from '../components/home/TrainersSection'
import StoreCTA from '../components/home/StoreCTA'

export default function HomePage() {
    return (
        <>
            <Hero />
            <WithUs />
            <TrainersSection />
            <StoreCTA />
        </>
    )
}
