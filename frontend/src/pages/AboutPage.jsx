import '../styles/about.css'
import StorySection from '../components/about/StorySection'
import StatsDashboard from '../components/about/StatsDashboard'
import Gallery from '../components/about/Gallery'
import '../styles/about.css'

export default function AboutPage() {
    return (
        <>
            <StorySection />
            <StatsDashboard />
            <Gallery />
        </>
    )
}
