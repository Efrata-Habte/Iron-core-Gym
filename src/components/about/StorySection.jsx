import SectionHeading from '../ui/SectionHeading'

export default function StorySection() {
    return (
        <section className="flex flex-col items-center px-[10%] pt-12 pb-0 mt-0">
            <SectionHeading centered>
                OUR <span className="red-text">STORY</span>
            </SectionHeading>

            <div className="flex flex-wrap lg:flex-nowrap items-center gap-[10%] perspective-[1500px]">
                {/* Story Text */}
                <p className="leading-relaxed tracking-wide w-full lg:w-1/2 min-w-[348px] relative">
                    <span className="quote text-5xl font-semibold">"</span><br />
                    — Iron Core began in a cramped garage with nothing but a few weights, a pull-up bar,
                    and a dream to create a place where discipline forged strength. What started as a small circle
                    of determined friends grew into a powerhouse fitness center known for its no-excuses culture.
                    Today, Iron Core is where people come not just to train, but to push past their limits and become
                    stronger in body and mind. <span className="red-text">Today, we stand at...</span><br />
                    <span className="quote absolute right-[5%] -bottom-[30%] rotate-y-180">"</span>
                </p>

                {/* 3D Image */}
                <div className="relative flex-shrink perspective-[1500px] order-first lg:order-last">
                    <img
                        src="/images/dumbbell-row-store.png"
                        alt="dumbbell rows"
                        className="w-[35vw] min-w-[300px] transform -rotate-y-[30deg]"
                    />

                    {/* Gradient Overlay */}
                    <div
                        className="absolute inset-0 transform -rotate-y-[30deg]"
                        style={{
                            backgroundImage: 'radial-gradient(transparent, hsla(0, 0%, 0%, 0.2)), linear-gradient(to right, hsla(0, 0%, 0%, 0.3) 10%, transparent)'
                        }}
                    />

                    {/* Decorative Borders */}
                    <div className="absolute w-full h-full -left-[4%] -top-[8%] border-[5px] border-red-500 -z-10 transform rotate-y-[30deg]" />
                    <div className="absolute w-full h-full -right-[4%] -bottom-[6%] border-[5px] border-current -z-10 transform rotate-y-[30deg]" />
                </div>
            </div>
        </section>
    )
}
