import { useState, useEffect } from 'react'
import SectionHeading from '../ui/SectionHeading'
import { Download } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addNotification } = useNotification();

    useEffect(() => {
        fetch(`${API_URL}/gallery`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    console.error('API Error:', data);
                    addNotification('Failed to fetch gallery images', 'error');
                    return;
                }
                const imgUrls = data.map(img => img.imageUrl ? `${API_URL.replace('/api', '')}${img.imageUrl}` : img);
                setImages(imgUrls);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const downloadImage = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `gym-gallery-${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error('Download failed:', err);
            addNotification('Failed to download image', 'error');
        }
    };

    const columns = [[], [], []];
    images.forEach((img, i) => {
        columns[i % 3].push(img);
    });

    return (
        <section className="gallery-container">
            <SectionHeading centered>GALLERY</SectionHeading>

            <p className="gallery-desc">
                Become inspired by <span className="red-text">our collection.</span>
            </p>

            <div className="gallery">
                {loading ? (
                    <p style={{ color: 'white', textAlign: 'center', width: '100%', gridColumn: '1/4' }}>Loading gallery...</p>
                ) : images.length > 0 ? (
                    columns.map((column, colIndex) => (
                        <div key={colIndex} className="column">
                            {column.map((src, i) => (
                                <div key={i} className="gallery-item-wrapper">
                                    <img
                                        src={src}
                                        alt="Gallery image"
                                        loading="lazy"
                                    />
                                    <button
                                        className="download-btn"
                                        onClick={() => downloadImage(src)}
                                        title="Download Image"
                                    >
                                        <Download size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'var(--font-color-dim)', textAlign: 'center', width: '100%', gridColumn: '1/4', padding: '4rem 0' }}>No gallery images available yet.</p>
                )}
            </div>

            <style>{`
                .gallery-item-wrapper {
                    position: relative;
                    margin-bottom: 1rem;
                }
                .gallery-item-wrapper img {
                    width: 100%;
                    border-radius: 1rem;
                }
                .download-btn {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 50%;
                    padding: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: black;
                    opacity: 0;
                    transition: opacity 0.3s ease, transform 0.2s ease;
                    transform: translateY(10px);
                }
                .gallery-item-wrapper:hover .download-btn {
                    opacity: 1;
                    transform: translateY(0);
                }
                .download-btn:hover {
                    background: var(--primary-color);
                    color: white;
                }
            `}</style>
        </section>
    )
}
