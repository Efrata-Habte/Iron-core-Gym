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
                // Construct absolute URLs and keep metadata
                const imgData = data.map(img => {
                    const baseUrl = API_URL.replace(/\/api$/, '');
                    // Skip images without valid url data
                    if (!img.url) return null;
                    return {
                        id: img._id,
                        src: img.url.startsWith('http') || img.url.startsWith('data:') ? img.url : `${baseUrl}${img.url}`,
                        title: img.title || '',
                        uploaderName: img.uploadedBy?.name || ''
                    };
                }).filter(Boolean);
                setImages(imgData);
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

            const data = await res.json();
            if (!res.ok) {
                // Check for storage capacity error
                if (res.status === 507 || data.isStorageFull) {
                    throw new Error('Database storage is full. Please contact the administrator.');
                }
                throw new Error(data.message || 'Upload failed');
            }

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
                    // Skeleton Loader
                    [0, 1, 2].map((colIndex) => (
                        <div key={colIndex} className="column">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="gallery-item-wrapper skeleton-item">
                                    <div className="skeleton-image shimmer"></div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : images.length > 0 ? (
                    columns.map((column, colIndex) => (
                        <div key={colIndex} className="column">
                            {column.map((item, i) => (
                                <div key={i} className="gallery-item-wrapper">
                                    <img
                                        src={item.src}
                                        alt={item.title || "Gallery image"}
                                        loading="lazy"
                                    />
                                    <div
                                        className="gallery-item-overlay"
                                        onClick={() => setSelectedImage(item)}
                                        style={{ cursor: 'zoom-in' }}
                                    >
                                        <div className="gallery-item-info">
                                            {item.uploaderName && <span className="uploader-name">{item.uploaderName}</span>}
                                            {item.title && <h4 className="image-title">{item.title}</h4>}
                                        </div>
                                        <button
                                            className="download-btn"
                                            onClick={(e) => { e.stopPropagation(); downloadImage(item.src); }}
                                            title="Download Image"
                                        >
                                            <Download size={20} />
                                        </button>
                                    </div>
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
                    uploaderName={selectedImage.uploaderName}
                    onDownload={() => downloadImage(selectedImage.src)}
                    onClose={() => setSelectedImage(null)}
                />
            )}

            <style>{`
                .gallery-item-wrapper {
                    position: relative;
                    margin-bottom: 1rem;
                    border-radius: 1rem;
                    overflow: hidden;
                }
                .gallery-item-wrapper img {
                    width: 100%;
                    display: block;
                    transition: transform 0.5s ease;
                }
                .gallery-item-wrapper:hover img {
                    transform: scale(1.05);
                }
                .gallery-item-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 30%, transparent 100%);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 1.5rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .gallery-item-wrapper:hover .gallery-item-overlay {
                    opacity: 1;
                }
                .gallery-item-info {
                    margin-right: 3rem;
                }
                .uploader-name {
                    color: var(--font-color-dim);
                    font-size: 0.8rem;
                    display: block;
                    text-transform: capitalize;
                    letter-spacing: 1px;
                    margin-bottom: 0.2rem;
                    font-weight: 600;
                }
                .image-title {
                    color: white;
                    font-size: 1.4rem;
                    margin: 0;
                    font-weight: 500;
                    line-height: 1.2;
                }
                .download-btn {
                    position: absolute;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 50%;
                    padding: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: black;
                    transition: all 0.2s ease;
                    transform: translateY(10px);
                }
                .gallery-item-wrapper:hover .download-btn {
                    transform: translateY(0);
                }
                .download-btn:hover {
                    background: var(--primary-color);
                    color: white;
                    transform: scale(1.1) !important;
                }

                /* Skeleton Loader Styles */
                .skeleton-item {
                    height: 300px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 1rem;
                    overflow: hidden;
                    position: relative;
                }
                .skeleton-image {
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.05);
                }
                .shimmer {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    transform: translateX(-100%);
                    background-image: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0,
                        rgba(255, 255, 255, 0.05) 20%,
                        rgba(255, 255, 255, 0.1) 60%,
                        rgba(255, 255, 255, 0)
                    );
                    animation: shimmer 2s infinite;
                }
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </section>
    )
}
