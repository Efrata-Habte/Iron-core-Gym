import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import '../../styles/admin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminStats() {
    const { token } = useAuth();
    const { addNotification } = useNotification();
    const [stats, setStats] = useState({ totalUsers: 0, activeMembers: 0, revenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/stats`, { headers: { Authorization: `Bearer ${token}` } });
                if (!res.ok) throw new Error('Failed to fetch stats');
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error(err);
                addNotification('Failed to load stats', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchStats();
    }, [token, addNotification]);

    if (loading) return <div className="loading-spinner" style={{ margin: '2rem auto' }}></div>;

    return (
        <div className="stats-grid">
            <div className="glass stats-card">
                <h3>Total Users</h3>
                <p className="stats-value">{stats.totalUsers}</p>
            </div>
            <div className="glass stats-card">
                <h3>Active Members</h3>
                <p className="stats-value">{stats.activeMembers}</p>
            </div>
            <div className="glass stats-card">
                <h3>Est. Revenue</h3>
                <p className="stats-value stats-revenue">${stats.revenue}</p>
            </div>
        </div>
    );
}
