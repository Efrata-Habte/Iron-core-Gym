import { useState, useEffect } from 'react'
import SectionHeading from '../ui/SectionHeading'
import { Download, Upload, Plus, X } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'
import InputField from '../ui/InputField'
import ImageModal from '../ui/ImageModal'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Gallery() {
    const { user, token } = useAuth();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addNotification } = useNotification();

    // Lightbox state
    const [selectedImage, setSelectedImage] = useState(null);

    // Upload state
    const [showUpload, setShowUpload] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const fetchImages = () => {
        setLoading(true);
        fetch(`${API_URL}/gallery`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    addNotification('Failed to fetch gallery images', 'error');
                    return;
                }
                // Construct absolute URLs if needed, otherwise use the virtual 'image' field directly
                const imgUrls = data.map(img => {
                    if (img.image.startsWith('http')) return img.image;
                    // If it's a relative path from our API (like /api/gallery/:id/image), simple prepend host if needed
                    // But usually, if API_URL includes host, we might need to handle it.
                    // Actually, the virtual 'image' returns `/api/gallery/:id/image`.
                    // API_URL usually is `http://localhost:5000/api`.
                    // So we want `http://localhost:5000/api/gallery/:id/image`.

                    // Best approach: construct from API_URL base
                    const baseUrl = API_URL.replace(/\/api$/, ''); // Remove trailing /api to get host
                    return `${baseUrl}${img.image}`;
                });
                setImages(imgUrls);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);

        try {
            const res = await fetch(`${API_URL}/gallery`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            if (!res.ok) throw new Error('Upload failed');

            addNotification((user.role === 'admin' || user.role === 'super-admin') ? 'Image uploaded!' : 'Image submitted for approval!', 'success');
            setShowUpload(false);
            setTitle('');
            setFile(null);
            if (user.role === 'admin' || user.role === 'super-admin') fetchImages();
        } catch (err) {
            addNotification(err.message, 'error');
        } finally {
            setUploading(false);
        }
    };

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

            {user && (
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <Button onClick={() => setShowUpload(!showUpload)} icon={showUpload ? X : Plus}>
                        {showUpload ? 'Cancel Upload' : 'Share Your Progress'}
                    </Button>
                </div>
            )}

            {showUpload && (
                <div className="glass upload-form" style={{ maxWidth: '500px', margin: '0 auto 4rem', padding: '2rem' }}>
                    <h3 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>Upload Image</h3>
                    <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <InputField
                            label="Image Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. My Transformation"
                        />
                        <div className="file-input-group">
                            <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Select Image*</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setFile(e.target.files[0])}
                                required
                                style={{ color: 'white' }}
                            />
                        </div>
                        <Button type="submit" disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Submit Image'}
                        </Button>
                    </form>
                </div>
            )}

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
                                        onClick={() => setSelectedImage({ src, title: 'Iron Core Gallery' })}
                                        style={{ cursor: 'zoom-in' }}
                                    />
                                    <button
                                        className="download-btn"
                                        onClick={(e) => { e.stopPropagation(); downloadImage(src); }}
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

            {selectedImage && (
                <ImageModal
                    imageSrc={selectedImage.src}
                    title={selectedImage.title}
                    onClose={() => setSelectedImage(null)}
                />
            )}

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
