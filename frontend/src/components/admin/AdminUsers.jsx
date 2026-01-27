import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import '../../styles/admin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminUsers() {
    const { token, user: currentUser } = useAuth();
    const { addNotification } = useNotification();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const isSuperAdmin = useMemo(() => currentUser?.role === 'super-admin', [currentUser]);

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

    const handleToggleAdmin = async (userId) => {
        try {
            const res = await fetch(`${API_URL}/users/${userId}/toggle-admin`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to update admin status');
            const data = await res.json();
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: data.user.role } : u));
            addNotification(data.message, 'success');
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
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {/* Everyone can toggle paid status for members */}
                                    {user.role !== 'admin' && user.role !== 'super-admin' && (
                                        <button
                                            className="toggle-btn"
                                            onClick={() => {
                                                const newStatus = user.membershipStatus === 'active' ? 'inactive' : 'active';
                                                fetch(`${API_URL}/users/${user._id}`, {
                                                    method: 'PATCH',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        Authorization: `Bearer ${token}`
                                                    },
                                                    body: JSON.stringify({ membershipStatus: newStatus })
                                                }).then(res => res.json())
                                                    .then(updated => {
                                                        setUsers(prev => prev.map(u => u._id === user._id ? updated : u));
                                                        addNotification('Status updated', 'success');
                                                    });
                                            }}
                                        >
                                            Toggle Paid
                                        </button>
                                    )}

                                    {/* Super Admin can toggle Admin role */}
                                    {isSuperAdmin && user._id !== currentUser.id && (
                                        <button
                                            className="toggle-btn admin-toggle"
                                            onClick={() => handleToggleAdmin(user._id)}
                                            style={{ backgroundColor: user.role === 'admin' ? '#e74c3c' : '#2ecc71' }}
                                        >
                                            {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
