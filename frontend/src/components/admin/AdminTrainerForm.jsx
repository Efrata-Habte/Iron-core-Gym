import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import '../../styles/admin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminTrainerForm() {
    const { token } = useAuth();
    const { addNotification } = useNotification();
    const [trainerForm, setTrainerForm] = useState({
        name: '',
        years: '',
        headline: '',
        quote: '',
        image: null
    });
    const [submitting, setSubmitting] = useState(false);

    const handleTrainerSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append('name', trainerForm.name);
        formData.append('years', trainerForm.years);
        formData.append('headline', trainerForm.headline);
        formData.append('quote', trainerForm.quote);
        if (trainerForm.image) formData.append('image', trainerForm.image);

        try {
            const res = await fetch(`${API_URL}/trainers`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });
            if (res.ok) {
                addNotification('Trainer added successfully!', 'success');
                setTrainerForm({ name: '', years: '', headline: '', quote: '', image: null });
                // Reset file input manually if needed or let React handle it via key
            } else {
                const data = await res.json();
                throw new Error(data.message || 'Failed to add trainer');
            }
        } catch (err) {
            addNotification(err.message, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="glass trainer-form-container">
            <h3>Add New Trainer</h3>
            <form onSubmit={handleTrainerSubmit} className="trainer-form">
                <InputField
                    label="Name"
                    name="name"
                    value={trainerForm.name}
                    onChange={e => setTrainerForm({ ...trainerForm, name: e.target.value })}
                    required
                />
                <InputField
                    label="Years of Experience"
                    name="years"
                    type="number"
                    value={trainerForm.years}
                    onChange={e => setTrainerForm({ ...trainerForm, years: e.target.value })}
                    required
                />
                <InputField
                    label="Header Quote"
                    name="headline"
                    placeholder="e.g. 'Push your limits'"
                    value={trainerForm.headline}
                    onChange={e => setTrainerForm({ ...trainerForm, headline: e.target.value })}
                />
                <InputField
                    label="Deatil Quote"
                    name="quote"
                    placeholder="A longer inspirational quote..."
                    value={trainerForm.quote}
                    onChange={e => setTrainerForm({ ...trainerForm, quote: e.target.value })}
                />
                <div className="file-input-group">
                    <label>Trainer Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setTrainerForm({ ...trainerForm, image: e.target.files[0] })}
                        required
                    />
                </div>
                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Enrolling...' : 'Enroll Trainer'}
                </Button>
            </form>
        </div>
    );
}
