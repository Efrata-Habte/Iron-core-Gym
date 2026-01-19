import { useState, useEffect } from 'react'
import TrainerCard from '../components/home/TrainerCard'
import SectionHeading from '../components/ui/SectionHeading'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function TrainersPage() {
    const [trainers, setTrainers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_URL}/trainers`)
            .then(res => res.json())
            .then(data => {
                setTrainers(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    return (
        <section className="main trainers-page">
            <SectionHeading centered>
                MEET OUR <span className="red-text">TRAINERS</span>
            </SectionHeading>

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading trainers...</p>
            ) : (
                <div className="trainers-grid">
                    {trainers.map((trainer, index) => (
                        <TrainerCard
                            key={trainer._id}
                            {...trainer}
                            position={index % 2 === 0 ? 'right' : 'left'}
                        />
                    ))}
                </div>
            )}

            <style>{`
                .trainers-page {
                    padding-bottom: 6rem;
                }
                .trainers-grid {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                }
            `}</style>
        </section>
    )
}
