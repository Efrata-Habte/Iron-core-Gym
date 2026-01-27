import { X, User, Mail, Phone, Shield, CreditCard } from 'lucide-react';
import '../../styles/common.css';

export default function ProfilePopup({ user, onClose }) {
    if (!user) return null;

    return (
        <div className="profile-popup-overlay" onClick={onClose}>
            <div className="profile-popup-content" onClick={e => e.stopPropagation()}>
                <button className="profile-popup-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="profile-header">
                    <div className="profile-avatar">
                        <User size={40} />
                    </div>
                    <h2>{user.name}</h2>
                    <span className="profile-role-badge">{user.role}</span>
                </div>

                <div className="profile-details">
                    <div className="profile-detail-item">
                        <Mail size={18} />
                        <div>
                            <label>Email</label>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <Phone size={18} />
                        <div>
                            <label>Phone</label>
                            <p>{user.phone || 'Not provided'}</p>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <Shield size={18} />
                        <div>
                            <label>Membership Status</label>
                            <p className={`status-text ${user.membershipStatus === 'active' ? 'active' : 'inactive'}`}>
                                {user.membershipStatus || 'Pending'}
                            </p>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <CreditCard size={18} />
                        <div>
                            <label>Plan</label>
                            <p>{user.membershipPlan?.title || 'No plan selected'}</p>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <User size={18} />
                        <div>
                            <label>Assigned Trainer</label>
                            <p>{user.assignedTrainer?.name || 'No trainer assigned'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
