import { Link } from 'react-router-dom'
import { User, Mail } from 'lucide-react'
import { useState } from 'react'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import FloatingBall from '../components/ui/FloatingBall'
import { useNotification } from '../context/NotificationContext'
import '../styles/form.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getUserFriendlyErrorMessage = (backendError) => {
    if (!backendError) return "An unexpected error occurred. Please try again later.";

    // Normalize error for matching
    const error = backendError.toLowerCase();

    // Authentication Errors
    if (error.includes("invalid login") || error.includes("535") || error.includes("username and password not accepted")) {
        return "Email service authentication failed. Contact the system admin verify credentials.";
    }

    // Connection/Network Errors
    if (error.includes("etimedout") || error.includes("timeout")) {
        return "Connection timed out. Please check your internet and retry.";
    }
    if (error.includes("econnrefused")) {
        return "Unable to connect to the email server. Service might be down.";
    }
    if (error.includes("enotfound") || error.includes("eai_again") || error.includes("dns")) {
        return "Network error. Please check your internet connection.";
    }

    // Configuration Errors
    if (error.includes("no recipients defined")) {
        return "System configuration error. Recipient email missing.";
    }

    // Rate Limiting (Common with free SMTP)
    if (error.includes("too many messages") || error.includes("limit exceed")) {
        return "Traffic limit reached. Please try again in 15 minutes.";
    }

    // Fallback: Use the backend message if it's short/readable, otherwise generic
    return "An unexpected error occurred. Please try again.";
};

export default function ContactPage() {
    const { addNotification } = useNotification();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSubmitting) return;

        setIsSubmitting(true);
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        try {
            const res = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await res.json();

            if (res.ok) {
                addNotification('Message sent successfully!', 'success');
                e.target.reset();
            } else {
                const friendlyMessage = getUserFriendlyErrorMessage(result.message);
                addNotification(friendlyMessage, 'error');
            }
        } catch (err) {
            addNotification('Error connecting to the server. Check your connection.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="main contact">
            <form onSubmit={handleSubmit}>
                <h1>
                    Contact <span className="red-text">us</span>
                </h1>

                <hr />

                <InputField
                    label="Full name"
                    name="name"
                    placeholder="your response"
                    icon={User}
                    required
                />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="youremail@gmail.com"
                    icon={Mail}
                    required
                />

                <p style={{ fontSize: '0.9rem', color: 'var(--font-color-dim)' }}>
                    Are you a member?{' '}
                    <Link to="/plans">Get membership.</Link>
                </p>

                <InputField
                    label="Message"
                    name="msg"
                    type="textarea"
                    placeholder="your message..."
                    required
                />

                <Button
                    type="submit"
                    className="submit"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                    {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
            </form>

            <FloatingBall color="black" size={260} top="15%" left="10%" />
            <FloatingBall color="red" size={280} bottom="10%" right="10%" />

        </section>
    )
}
