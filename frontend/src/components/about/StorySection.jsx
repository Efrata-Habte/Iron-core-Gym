import SectionHeading from '../ui/SectionHeading'

export default function StorySection() {
    return (
        <section className="story-container">
            <SectionHeading centered>
                OUR <span className="red-text">STORY</span>
            </SectionHeading>

            <div className="story">
                <p className="text">
                    <span className="quote">"</span><br />
                    — Iron Core began in a cramped garage with nothing but a few weights, a pull-up bar,
                    and a dream to create a place where discipline forged strength. What started as a small circle
                    of determined friends grew into a powerhouse fitness center known for its no-excuses culture.
                    Today, Iron Core is where people come not just to train, but to push past their limits and become
                    stronger in body and mind. <span className="red-text">Today, we stand at...</span><br />
                    <span className="quote last">"</span>
                </p>

                <div className="image">
                    <div className="img-cover"></div>
                    <img
                        src="/images/dumbbell-row-store.png"
                        alt="dumbbell rows"
                    />
                </div>
            </div>
        </section>
    )
}
