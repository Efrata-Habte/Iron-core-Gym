import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../ui/Button';
import ImageModal from '../ui/ImageModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminGalleryApproval() {
    const { token } = useAuth();
    const { addNotification } = useNotification();
    const [pendingImages, setPendingImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await fetch(`${API_URL}/gallery/pending`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch pending images');
                const data = await res.json();
                setPendingImages(data);
            } catch (err) {
                addNotification(err.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchPending();
    }, [token, addNotification]);

    const handleApprove = async (id) => {
        try {
            const res = await fetch(`${API_URL}/gallery/${id}/approve`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Approval failed');

            setPendingImages(prev => prev.filter(img => img._id !== id));
            addNotification('Image approved and live!', 'success');
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to reject and delete this image?')) return;
        try {
            const res = await fetch(`${API_URL}/gallery/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Deletion failed');

            setPendingImages(prev => prev.filter(img => img._id !== id));
            addNotification('Image rejected and deleted', 'info');
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    if (loading) return <div className="loading-spinner"></div>;

    return (
        <div className="gallery-approval-section">
            <h3 style={{ marginBottom: '1.5rem' }}>Pending Gallery Uploads</h3>
            {pendingImages.length === 0 ? (
                <div className="glass dim-text">No pending approvals.</div>
            ) : (
                <div className="pending-grid">
                    {pendingImages.filter(img => img.url).map(img => (
                        <div key={img._id} className="glass pending-card">
                            <img
                                src={img.url}
                                alt={img.title}
                                onClick={() => setSelectedImage({ src: img.url, title: img.title })}
                                style={{ cursor: 'zoom-in' }}
                            />
                            <div className="pending-info">
                                <h4>{img.title || 'Untitled'}</h4>
                                <p>By: {img.uploadedBy?.name || 'Unknown'}</p>
                                <div className="action-btns">
                                    <Button onClick={() => handleApprove(img._id)} style={{ width: '100%' }}>Approve</Button>
                                    <Button onClick={() => handleDelete(img._id)} variant="outline" style={{ width: '100%' }}>Reject</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedImage && (
                <ImageModal
                    imageSrc={selectedImage.src}
                    title={selectedImage.title}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
}
