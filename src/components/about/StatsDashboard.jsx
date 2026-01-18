const stats = [
    { value: '11+', label: 'years of experience' },
    { value: '29', label: 'trainers' },
    { value: '311+', label: 'trainees' },
    { value: '110+', label: 'testimonials' },
]

export default function StatsDashboard() {
    return (
        <section className="dashboard">
            <div className="cover"></div>
            {stats.map(({ value, label }) => (
                <div key={label} className="dash-card">
                    <p className="big-num">{value}</p>
                    <p>{label}</p>
                </div>
            ))}
        </section>
    )
}
