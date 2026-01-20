import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import '../../styles/admin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminUsers() {
    const { token } = useAuth();
    const { addNotification } = useNotification();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });
                if (!res.ok) throw new Error('Failed to fetch users');
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error(err);
                addNotification('Failed to load users', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchUsers();
    }, [token, addNotification]);

    const handleUserUpdate = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        try {
            const res = await fetch(`${API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ membershipStatus: newStatus })
            });

            if (!res.ok) throw new Error('Failed to update user');

            const updatedUser = await res.json();
            setUsers(prev => prev.map(u => u._id === userId ? updatedUser : u));
            addNotification(`User marked as ${newStatus}`, 'success');
        } catch (err) {
            addNotification(err.message, 'error');
        }
    };

    if (loading) return <div className="loading-spinner" style={{ margin: '2rem auto' }}></div>;

    if (users.length === 0) {
        return (
            <div className="users-table glass" style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--font-color-dim)' }}>No users registered yet.</p>
            </div>
        );
    }

    return (
        <div className="users-table glass">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <span className={`status-badge ${user.membershipStatus === 'active' ? 'status-active' : 'status-inactive'}`}>
                                    {user.membershipStatus}
                                </span>
                            </td>
                            <td>
                                {user.role !== 'admin' && (
                                    <button
                                        className="toggle-btn"
                                        onClick={() => handleUserUpdate(user._id, user.membershipStatus)}
                                    >
                                        Toggle Paid
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
