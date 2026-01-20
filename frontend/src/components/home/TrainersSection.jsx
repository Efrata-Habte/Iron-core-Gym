import { useState, useEffect } from 'react'
import SectionHeading from '../ui/SectionHeading'
import TrainerCard from './TrainerCard'
import Button from '../ui/Button'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function TrainersSection() {
    const [trainers, setTrainers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_URL}/trainers`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    console.error('API Error:', data);
                    addNotification('Failed to fetch trainers', 'error');
                    return;
                }
                // Ranking: Sort by years of experience (descending)
                const sorted = data.sort((a, b) => b.years - a.years);
                // Limit to top 3 for the home page
                setTrainers(sorted.slice(0, 3));
            })
            .catch(err => {
                console.error(err)
                addNotification('Failed to fetch trainers', 'error')
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <section className="trainers-section">
            <SectionHeading centered>
                OUR <span className="red-text">TRAINERS</span>
            </SectionHeading>

            {loading ? (
                <p style={{ color: 'white', textAlign: 'center', margin: '2rem 0' }}>Loading trainers...</p>
            ) : trainers.length > 0 ? (
                trainers.map((trainer, index) => (
                    <TrainerCard
                        key={trainer._id || index}
                        {...trainer}
                        position={index % 2 === 0 ? 'right' : 'left'}
                    />
                ))
            ) : (
                <div style={{ textAlign: 'center', margin: '4rem 0' }}>
                    <p style={{ color: 'var(--font-color-dim)', fontSize: '1.2rem' }}>No trainers available at the moment.</p>
                </div>
            )}

            <div className="join-cta">
                <p>
                    "Ready to take the first step towards a healthier you? Join Iron Core Gym today and experience the difference our expert trainers can make."
                </p>
                <Button to="/plans">Join now</Button>
            </div>
        </section>
    )
}
