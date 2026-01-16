import Button from '../ui/Button'

const storeImages = [
    { src: '/images/discs-store.png', alt: 'barbell discs' },
    { src: '/images/barbell-store.png', alt: 'sit-up bench' },
    { src: '/images/dumbbells-store.png', alt: 'dumbbells' },
    { src: '/images/dumbbell-row-store.png', alt: 'dumbbells and ropes' },
]

export default function StoreCTA() {
    return (
        <section
            className="relative flex justify-center bg-cover bg-no-repeat bg-left py-16 my-12"
            style={{ backgroundImage: "url('/images/dark-wallpaper.jpg')" }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Content Card */}
            <div className="relative z-10 flex flex-wrap max-w-[740px] gap-8 px-4">
                {/* Store Images Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                    {storeImages.map(({ src, alt }) => (
                        <img
                            key={src}
                            src={src}
                            alt={alt}
                            className="w-[200px] opacity-70 rounded-md border border-gray-500/60"
                        />
                    ))}
                </div>

                {/* Text & CTA - height auto to match images, with proper spacing */}
                <div className="flex flex-col items-center justify-between bg-[hsl(0,0%,10%)] py-2.5 px-5 rounded-lg min-h-[300px] flex-1">
                    <h1 className="text-[2.2rem] text-white text-center [&::before]:hidden !m-0 font-heading font-normal">
                        Gear Up From <span className="red-text">Our Store</span>
                    </h1>

                    <p className="text-gray-300 text-sm text-center">
                        Our store offers high-quality equipment starting from fitness
                        outfits to instruments. Check us out and buy what you need.
                    </p>

                    <div className="w-full flex justify-center">
                        <Button className="w-[96%] text-center justify-center">Shop Now</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
