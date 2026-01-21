import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../ui/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminGalleryApproval() {
    const { token } = useAuth();
    const { addNotification } = useNotification();
    const [pendingImages, setPendingImages] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="admin-content-section">
            <h3>Pending Gallery Uploads</h3>
            {pendingImages.length === 0 ? (
                <p className="dim-text">No pending approvals.</p>
            ) : (
                <div className="pending-grid">
                    {pendingImages.map(img => (
                        <div key={img._id} className="glass pending-card">
                            <img src={`${API_URL.replace('/api', '')}${img.image}`} alt={img.title} />
                            <div className="pending-info">
                                <h4>{img.title || 'Untitled'}</h4>
                                <p>By: {img.uploadedBy?.name || 'Unknown'}</p>
                                <div className="action-btns">
                                    <Button onClick={() => handleApprove(img._id)}>Approve</Button>
                                    <Button onClick={() => handleDelete(img._id)} variant="outline">Reject</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
