import { useState, useEffect } from 'react'
import SectionHeading from '../components/ui/SectionHeading'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const BASE_URL = API_URL.replace('/api', '')

export default function GalleryPage() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_URL}/gallery`)
            .then(res => res.json())
            .then(data => {
                setImages(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    const handleDownload = (imageUrl, filename) => {
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename || 'gym-image.jpg';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(err => console.error('Download failed', err));
    }

    return (
        <section className="main gallery-page">
            <SectionHeading centered>
                GYM <span className="red-text">GALLERY</span>
            </SectionHeading>

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading gallery...</p>
            ) : (
                <div className="gallery-grid">
                    {images.map((img) => (
                        <div key={img._id} className="gallery-item glass">
                            <img src={`${BASE_URL}${img.image}`} alt={img.title} />
                            <div className="gallery-overlay">
                                <h3>{img.title}</h3>
                                <button onClick={() => handleDownload(`${BASE_URL}${img.image}`, img.title)}>
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                    padding: 2rem var(--section-side-padding);
                }
                .gallery-item {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    aspect-ratio: 16/10;
                    cursor: pointer;
                }
                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                .gallery-item:hover img {
                    transform: scale(1.05);
                }
                .gallery-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.8));
                    padding: 1.5rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .gallery-item:hover .gallery-overlay {
                    opacity: 1;
                }
                .gallery-overlay h3 {
                    margin: 0;
                    font-size: 1.2rem;
                }
                .gallery-overlay button {
                    font-size: 0.8rem;
                    padding: 8px 16px;
                }
            `}</style>
        </section>
    )
}
