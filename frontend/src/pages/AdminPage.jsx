import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import AdminStats from '../components/admin/AdminStats';
import AdminUsers from '../components/admin/AdminUsers';
import AdminTrainerForm from '../components/admin/AdminTrainerForm';
import '../styles/admin.css';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <section className="admin-page">
            <SectionHeading centered>ADMIN <span className="red-text">DASHBOARD</span></SectionHeading>

            <div className="admin-tabs">
                <Button
                    onClick={() => setActiveTab('dashboard')}
                    className={activeTab === 'dashboard' ? 'active-tab' : ''}
                >
                    Overview
                </Button>
                <Button
                    onClick={() => setActiveTab('users')}
                    className={activeTab === 'users' ? 'active-tab' : ''}
                >
                    Users
                </Button>
                <Button
                    onClick={() => setActiveTab('trainers')}
                    className={activeTab === 'trainers' ? 'active-tab' : ''}
                >
                    Add Trainer
                </Button>
            </div>

            {activeTab === 'dashboard' && <AdminStats />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'trainers' && <AdminTrainerForm />}
        </section>
    );
}
