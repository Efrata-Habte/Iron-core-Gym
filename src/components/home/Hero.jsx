import Button from '../ui/Button'
import GlassCard from '../ui/GlassCard'
import FloatingBall from '../ui/FloatingBall'


export default function Hero() {
    return (
        <section className="hero-section">
            <GlassCard className="hero">
                <div className="hero-text">
                    <div className="hero-header">
                        <h3>IRON CORE GYM</h3>
                        <h1>
                            NO PAIN <span className="red-text">NO GAIN</span>
                        </h1>
                    </div>

                    <p>
                        "Join the Iron Core community and transform your fitness with our expert coaches and personalized programs. Ready to{' '}
                        <span className="red-text">make a change?"</span>
                    </p>

                    <Button to="/plans">Become a Member Now</Button>
                </div>

                <img
                    src="/images/hero-background.png"
                    alt="a body builder"
                />
            </GlassCard>

            {/* Floating Balls using CSS classes */}
            {/* Floating Balls using CSS classes */}
            <FloatingBall color="black" size={300} bottom="-2%" right="12%" />
            <FloatingBall color="red" size={200} top="-3%" left="10%" />
            <FloatingBall color="black" size={100} top="6%" right="5%" zIndex={1} />
            <FloatingBall color="red" size={40} top="-2%" right="14%" />
            <FloatingBall color="red" size={45} top="25%" left="30%" />

        </section>
    )
}
