import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function StatsDashboard() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/stats/public`)
            .then(res => res.json())
            .then(data => {
                setStats([
                    { value: `${data.yearsExperience || 0}+`, label: 'years of experience' },
                    { value: data.trainersCount || 0, label: 'trainers' },
                    { value: `${data.traineesCount || 0}+`, label: 'trainees' },
                    { value: '110+', label: 'testimonials' }, // Testimonials still static for now
                ]);
            })
            .catch(err => console.error('Stats fetch failed:', err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="dashboard">
            <div className="cover"></div>
            {loading ? (
                <p style={{ color: 'white', gridColumn: '1/-1', textAlign: 'center' }}>Loading statistics...</p>
            ) : (
                stats.length > 0 ? (
                    stats.map(({ value, label }) => (
                        <div key={label} className="dash-card">
                            <p className="big-num">{value}</p>
                            <p>{label}</p>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'white', gridColumn: '1/-1', textAlign: 'center' }}>No statistics available.</p>
                )
            )}
        </section>
    )
}
