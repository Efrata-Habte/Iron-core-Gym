import { useState, useEffect } from 'react'
import { Dumbbell, Users, ShowerHead, BicepsFlexed, Wheat, HeartPlus } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const amenities = [
    { icon: Dumbbell, label: 'FULL EQUIPMENT' },
    { icon: Users, label: 'GREAT COMMUNITY' },
    { icon: HeartPlus, label: 'IMPROVED HEALTH' },
    { icon: ShowerHead, label: 'HOT SHOWER' },
    { icon: BicepsFlexed, label: 'GOOD PHYSIQUE' },
    { icon: Wheat, label: 'NUTRITION TIPS' },
]

export default function WithUs() {
    const [stats, setStats] = useState([
        { value: '0', label: 'years of experience', className: 'yrs' },
        { value: '0', label: 'trainers' },
        { value: '0', label: 'trainees' },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/stats/public`)
            .then(res => res.json())
            .then(data => {
                setStats([
                    { value: `${data.yearsExperience || 0}+`, label: 'years of experience', className: 'yrs' },
                    { value: data.trainersCount || 0, label: 'trainers' },
                    { value: `${data.traineesCount || 0}+`, label: 'trainees' },
                ]);
            })
            .catch(err => {
                console.error('Failed to fetch public stats:', err)
                addNotification('Failed to fetch public stats', 'error')
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="wu-dashboard">
            <SectionHeading centered>
                WITH <span className="red-text">US</span>
            </SectionHeading>

            <div className="wu-dash-container">
                <div className="comodities">
                    {amenities.map(({ icon: Icon, label }) => (
                        <div key={label} className="como-cont">
                            <Icon size={28} strokeWidth={2.5} />
                            <p className="como-text">{label}</p>
                        </div>
                    ))}
                </div>

                <hr />

                <div className="stats-cont">
                    {loading ? (
                        <p style={{ gridColumn: '1/3', color: 'gray' }}>Loading stats...</p>
                    ) : (
                        stats.map(({ value, label, className }) => (
                            <div key={label} className={`stat ${className || ''}`}>
                                <p className="big-num">{value}</p>
                                <p className="stat-text">{label}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}
