import Button from '../ui/Button'
import GlassCard from '../ui/GlassCard'
import FloatingBall from '../ui/FloatingBall'

export default function Hero() {
    return (
        // section.hero-section: padding: 6rem 8%; position: relative;
        <section className="relative py-24 px-[8%]">
            {/* .hero: padding: 1.8rem; padding-top: 6rem; position: relative; */}
            <GlassCard className="relative p-[1.8rem] pt-24">
                {/* .hero-text: flex column, gap: 1.8rem, width: 60%, min-width: 34rem */}
                <div className="flex flex-col gap-[1.8rem] w-[60%] min-w-[34rem]">
                    {/* Hero Header */}
                    <div className="hero-header">
                        {/* .hero h3: font-weight: 100, letter-spacing: .02rem, padding-left: 1.5px */}
                        <h3 className="font-thin tracking-[0.02rem] pl-[1.5px]">IRON CORE GYM</h3>
                        {/* .hero h1: font-family: Anton, font-size: 4.8rem, font-weight: 500, letter-spacing: .1rem, margin-top: -20px, margin-bottom: 0 */}
                        <h1 className="font-display text-[4.8rem] font-medium tracking-[0.1rem] -mt-5 mb-0 leading-tight [&::before]:hidden">
                            NO PAIN <span className="red-text font-display">NO GAIN</span>
                        </h1>
                    </div>

                    {/* .hero-text p: font-size: 1.2rem, padding-bottom: 1.6rem */}
                    <p className="text-[1.2rem] pb-[1.6rem]">
                        "Join the Iron Core community and transform your fitness with our expert coaches and personalized programs. Ready to{' '}
                        <span className="red-text">make a change?"</span>
                    </p>

                    {/* CTA Button */}
                    <Button to="/plans">Become a Member Now</Button>
                </div>

                {/* .hero img: width: 31vw, min-width: 30rem, max-width: 33rem, position: absolute, bottom: 0, right: -22px, z-index: -1 */}
                <img
                    src="/images/hero-background.png"
                    alt="a body builder"
                    className="absolute bottom-0 right-[-22px] w-[31vw] min-w-[30rem] max-w-[33rem] -z-10"
                />
            </GlassCard>

            {/* Floating Balls - exact positions from .hero-section .b1-.b5 */}
            {/* .b1: 300px, bottom: -2%, right: 12% */}
            <FloatingBall color="black" size={300} bottom="-2%" right="12%" />
            {/* .b2: 200px, top: -3%, left: 10% */}
            <FloatingBall color="red" size={200} top="-3%" left="10%" />
            {/* .b3: 100px, top: 6%, right: 5%, z-index: 1 */}
            <FloatingBall color="black" size={100} top="6%" right="5%" className="!z-10" />
            {/* .b4: 40px, top: -2%, right: 14% */}
            <FloatingBall color="red" size={40} top="-2%" right="14%" />
            {/* .b5: 45px, top: 25%, left: 30% */}
            <FloatingBall color="red" size={45} top="25%" left="30%" />
        </section>
    )
}
