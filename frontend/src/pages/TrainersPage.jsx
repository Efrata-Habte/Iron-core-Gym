import { useState, useEffect } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import Button from '../components/ui/Button'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function TrainersPage() {
    const { user, token, refreshUser } = useAuth()
    const { addNotification } = useNotification()
    const [trainers, setTrainers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('[DEBUG] Current User:', user);
        fetch(`${API_URL}/trainers`)
            .then(res => res.json())
            .then(data => {
                console.log('[DEBUG] Trainers list:', data);
                if (Array.isArray(data)) {
                    setTrainers(data)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [user])

    const handleEnroll = async (trainerId, trainerName) => {
        if (!token) {
            addNotification('Please login to enroll in training', 'info');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/trainers/enroll/${trainerId}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Enrollment failed');

            addNotification(data.message || `You have successfully enrolled with ${trainerName}!`, 'success');

            // Refresh user state to update assignedTrainer
            await refreshUser();

            // Refresh trainer list locally
            const updatedTrainers = trainers.map(t =>
                t._id === trainerId ? { ...t, currentTrainees: t.currentTrainees + 1, isAvailable: (t.currentTrainees + 1 < t.maxTrainees) } : t
            );
            setTrainers(updatedTrainers);
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    return (
        <section className="main trainers-page">
            <SectionHeading centered>
                MEET OUR <span className="red-text">TRAINERS</span>
            </SectionHeading>

            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <div className="trainers-grid">
                    {trainers.map((trainer) => {
                        const isEnrolledWithThisTrainer = user?.assignedTrainer === trainer._id;
                        const canEnroll = trainer.isAvailable && !user?.assignedTrainer;

                        return (
                            <GlassCard key={trainer._id} className={`trainer-simple-card ${isEnrolledWithThisTrainer ? 'is-enrolled' : ''}`}>
                                <div className="trainer-img-container">
                                    <img src={trainer.image} alt={trainer.name} />
                                    <div className={`status-badge ${trainer.isAvailable ? 'available' : 'unavailable'}`}>
                                        {trainer.isAvailable ? 'Available' : 'Unavailable'}
                                    </div>
                                    {isEnrolledWithThisTrainer && (
                                        <div className="enrolled-badge">YOUR TRAINER</div>
                                    )}
                                </div>
                                <div className="trainer-info">
                                    <h3>{trainer.name}</h3>
                                    <p className="experience">{trainer.years} Years Experience</p>
                                    <p className="capacity">Trainees: {trainer.currentTrainees} / {trainer.maxTrainees}</p>
                                    <p className="quote" style={{ marginBottom: '1.5rem' }}>"{trainer.quote}"</p>

                                    {(!user || (user.role !== 'admin' && user.role !== 'super-admin')) && (
                                        <Button
                                            onClick={() => handleEnroll(trainer._id, trainer.name)}
                                            disabled={!canEnroll && !isEnrolledWithThisTrainer}
                                            className={!trainer.isAvailable && !isEnrolledWithThisTrainer ? 'btn-unavailable' : ''}
                                            style={{ width: '100%' }}
                                        >
                                            {user?.assignedTrainer
                                                ? 'Already Enrolled'
                                                : trainer.isAvailable
                                                    ? 'Request Placement'
                                                    : 'Trainer Full'
                                            }
                                        </Button>
                                    )}
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            )}

            <style>{`
                .trainers-page {
                    padding-bottom: 6rem;
                    display: flex;
                    flex-direction: column;
                    gap: 4rem;
                    width: 100%;
                    overflow-x: hidden;
                }
                .trainers-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    width: 100%;
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
                .trainer-simple-card.is-enrolled {
                    border: 2px solid var(--red-font-color) !important;
                    border-image: none !important;
                    box-shadow: 0 0 20px rgba(183, 10, 10, 0.4);
                    position: relative;
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
                .enrolled-badge {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    background: var(--red-font-color);
                    color: white;
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: bold;
                    letter-spacing: 1px;
                    z-index: 10;
                }
                .trainer-info {
                    padding: 1.5rem;
                    width: 100%;
                }
                .trainer-info h3 {
                    margin-bottom: 0.5rem;
                    font-size: 1.5rem;
                }
                .btn-unavailable {
                    background: #333 !important;
                    border: 1px solid #555 !important;
                    color: #777 !important;
                    cursor: not-allowed !important;
                }
                .experience {
                    color: var(--red-font-color);
                    font-weight: bold;
                    margin-bottom: 1rem;
                }
                .quote {
                    font-style: italic;
                    color: var(--font-color-dim);
                    font-size: 0.9rem;
                }

                /* Responsive: 2 trainers per row on tablets and mobile */
                @media screen and (max-width: 1024px) and (min-width: 768px) {
                    .trainers-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1.5rem;
                        padding: 1.5rem;
                    }
                }

                @media screen and (max-width: 767px) {
                    .trainers-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap-y: 1.5rem;
                        padding: 1rem;
                    }
                    .trainer-img-container {
                        height: 250px;
                    }
                    .trainer-info {
                        padding: 1rem;
                    }
                    .trainer-info h3 {
                        font-size: 1.2rem;
                    }
                    .quote {
                        font-size: 0.85rem;
                    }
                }

                /* Very small screens: 1 trainer per row */
                @media screen and (max-width: 500px) {
                    .trainers-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                        padding: 1rem;
                    }
                    .trainer-img-container {
                        height: 300px;
                    }
                }
            `}</style>
        </section>
    )
}
