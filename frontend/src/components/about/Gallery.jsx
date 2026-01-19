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
        <section className="gallery-container">
            <SectionHeading centered>GALLERY</SectionHeading>

            <p className="gallery-desc">
                Become inspired by <span className="red-text">our collection.</span>
            </p>

            <div className="gallery">
                {columns.map((column, colIndex) => (
                    <div key={colIndex} className="column">
                        {column.map((src) => (
                            <img
                                key={src}
                                src={src}
                                alt="Gallery image"
                                loading="lazy"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}
