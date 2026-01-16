const stats = [
    { value: '11+', label: 'years of experience' },
    { value: '29', label: 'trainers' },
    { value: '311+', label: 'trainees' },
    { value: '110+', label: 'testimonials' },
]

export default function StatsDashboard() {
    return (
        <section
            className="relative flex flex-wrap justify-center py-12 my-24 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/red-background.jpg')" }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Stat Cards */}
            {stats.map(({ value, label }) => (
                <div
                    key={label}
                    className="relative text-center p-10 rounded-xl min-w-[250px] border border-gray-500/40 
                     bg-gradient-to-br from-gray-500/40 to-transparent backdrop-blur-sm 
                     text-gray-200 -mr-6 -mt-6 transition-transform duration-500 
                     hover:scale-110 hover:animate-[left-up_0.5s_ease_forwards] hover:z-10"
                >
                    <p className="text-7xl font-medium">{value}</p>
                    <p>{label}</p>
                </div>
            ))}
        </section>
    )
}
