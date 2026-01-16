import SectionHeading from '../ui/SectionHeading'

// Generate image paths for 24 gallery images
const images = Array.from({ length: 24 }, (_, i) => `/images/img${i + 1}.png`)

// Split into 3 columns
const columns = [
    images.slice(0, 8),
    images.slice(8, 16),
    images.slice(16, 24),
]

export default function Gallery() {
    return (
        <section className="flex flex-col items-center my-24">
            <SectionHeading centered>GALLERY</SectionHeading>

            <p className="pb-5 w-fit relative">
                Become inspired by <span className="red-text">our collection.</span>
            </p>

            <div className="flex gap-6 p-6 w-full">
                {columns.map((column, colIndex) => (
                    <div key={colIndex} className="w-1/3 flex flex-col gap-6">
                        {column.map((src) => (
                            <img
                                key={src}
                                src={src}
                                alt="Gallery image"
                                className="w-full rounded hover:opacity-80 transition-opacity"
                                loading="lazy"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}
