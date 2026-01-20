import { createContext, useState, useContext, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            removeNotification(id);
        }, duration);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <div className="notification-container">
                {notifications.map(n => (
                    <div key={n.id} className={`notification ${n.type}`}>
                        {n.type === 'success' && <CheckCircle size={20} />}
                        {n.type === 'error' && <AlertCircle size={20} />}
                        {n.type === 'info' && <Info size={20} />}
                        <span>{n.message}</span>
                        <button onClick={() => removeNotification(n.id)}><X size={16} /></button>
                    </div>
                ))}
            </div>
            <style>{`
                .notification-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .notification {
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    animation: slideIn 0.3s ease-out;
                    border-left: 4px solid #fff;
                    min-width: 300px;
                }
                .notification.success { border-color: #4CAF50; }
                .notification.error { border-color: #f44336; }
                .notification.info { border-color: #2196F3; }
                
                .notification button {
                    background: none;
                    border: none;
                    color: #999;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 0;
                    display: flex;
                }
                .notification button:hover { color: white; }

                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
