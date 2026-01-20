import { useState, useEffect } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function TrainersPage() {
    const [trainers, setTrainers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_URL}/trainers`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTrainers(data)
                }
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
                <div className="loading-spinner"></div>
            ) : (
                <div className="trainers-grid">
                    {trainers.map((trainer) => (
                        <GlassCard key={trainer._id} className="trainer-simple-card">
                            <div className="trainer-img-container">
                                <img src={trainer.image} alt={trainer.name} />
                                <div className={`status-badge ${trainer.isAvailable ? 'available' : 'unavailable'}`}>
                                    {trainer.isAvailable ? 'Available' : 'Booked'}
                                </div>
                            </div>
                            <div className="trainer-info">
                                <h3>{trainer.name}</h3>
                                <p className="experience">{trainer.years} Years Experience</p>
                                <p className="quote">"{trainer.quote}"</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}

            <style>{`
                .trainers-page {
                    padding-bottom: 6rem;
                }
                .trainers-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .trainer-simple-card {
                    padding: 0 !important;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    transition: transform 0.3s ease;
                }
                .trainer-simple-card:hover {
                    transform: translateY(-5px);
                }
                .trainer-img-container {
                    width: 100%;
                    height: 300px;
                    position: relative;
                }
                .trainer-img-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                }
                .status-badge {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    color: white;
                    background: rgba(0,0,0,0.6);
                    backdrop-filter: blur(4px);
                }
                .status-badge.available {
                    border: 2px solid #00c853;
                }
                .status-badge.unavailable {
                    border: 2px solid #ff3d00;
                    color: #ff3d00;
                }
                .trainer-info {
                    padding: 1.5rem;
                    width: 100%;
                }
                .trainer-info h3 {
                    margin-bottom: 0.5rem;
                    font-size: 1.5rem;
                }
                .experience {
                    color: var(--primary-color);
                    font-weight: bold;
                    margin-bottom: 1rem;
                }
                .quote {
                    font-style: italic;
                    color: var(--font-color-dim);
                    font-size: 0.9rem;
                }
            `}</style>
        </section>
    )
}
