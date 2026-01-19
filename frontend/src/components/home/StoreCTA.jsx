import Button from '../ui/Button'

const storeImages = [
    { src: '/images/discs-store.png', alt: 'barbell discs' },
    { src: '/images/barbell-store.png', alt: 'sit-up bench' },
    { src: '/images/dumbbells-store.png', alt: 'dumbbells' },
    { src: '/images/dumbbell-row-store.png', alt: 'dumbbells and ropes' },
]

export default function StoreCTA() {
    return (
        <section className="store-cta">
            <div className="cta-cover"></div>

            <div className="cta-card">
                <div className="store-images">
                    {storeImages.map(({ src, alt }) => (
                        <img key={src} src={src} alt={alt} />
                    ))}
                </div>

                <div className="store-text">
                    <h1>
                        Gear Up From <span className="red-text">Our Store</span>
                    </h1>

                    <p>
                        Our store offers high-quality equipment starting from fitness
                        outfits to instruments. Check us out and buy what you need.
                    </p>

                    <Button>Shop Now</Button>
                </div>
            </div>
        </section>
    )
}
