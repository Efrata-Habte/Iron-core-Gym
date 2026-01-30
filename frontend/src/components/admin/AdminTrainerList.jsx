import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../ui/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminTrainerList() {
    const { token } = useAuth();
    const { addNotification } = useNotification();
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const res = await fetch(`${API_URL}/trainers`);
                if (!res.ok) throw new Error('Failed to fetch trainers');
                const data = await res.json();
                setTrainers(data);
            } catch (err) {
                addNotification(err.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, [addNotification]);

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this trainer? This will also unassign them from all trainees.')) return;
        try {
            const res = await fetch(`${API_URL}/trainers/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Delete failed');

            setTrainers(prev => prev.filter(t => t._id !== id));
            addNotification('Trainer removed successfully', 'success');
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <div className="loading-spinner"></div>
        </div>
    );

    return (
        <div className="users-table glass">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Experience</th>
                        <th>Trainees</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers.map(t => (
                        <tr key={t._id}>
                            <td>{t.name}</td>
                            <td>{t.years} yrs</td>
                            <td>{t.currentTrainees} / {t.maxTrainees}</td>
                            <td>
                                <span className={`status-badge ${t.isAvailable ? 'status-active' : 'status-inactive'}`}>
                                    {t.isAvailable ? 'Available' : 'Unavailable'}
                                </span>
                            </td>
                            <td>
                                <Button onClick={() => handleDelete(t._id)} variant="outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
