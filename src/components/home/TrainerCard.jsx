import GlassCard from '../ui/GlassCard'

export default function TrainerCard({
    name,
    years,
    headline,
    headlineAccent,
    quote,
    image,
    position, // 'right' or 'left'
    className = '',
    children
}) {
    return (
        <div className={`trainer-wrapper ${position} ${className}`}>
            <GlassCard className="trainer-card">
                <div className="trainer-text">
                    <h1>
                        {headline}<br />
                        <span className="red-text">{headlineAccent}</span>
                    </h1>

                    <p>
                        <span className="quote">"</span>
                        {quote}
                    </p>

                    <div className="trainer">
                        <h3>{name}</h3>
                        <span className="working-yrs">{years} yrs</span>
                    </div>
                </div>

                <img src={image} alt={name} />
            </GlassCard>

            {children}
        </div>
    )
}
