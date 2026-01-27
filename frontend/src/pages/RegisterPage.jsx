import { User, Mail, Lock, Phone, CreditCard } from 'lucide-react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import FloatingBall from '../components/ui/FloatingBall'
import { useNotification } from '../context/NotificationContext'
import '../styles/form.css'


const paymentOptions = [
    { value: 'telebirr', label: 'Telebirr' },
    { value: 'mobile', label: 'Mobile Banking' },
    { value: 'paypal', label: 'Paypal' },
]

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function RegisterPage() {
    const { addNotification } = useNotification();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const plan = searchParams.get('plan');

    useEffect(() => {
        if (!plan) {
            // Optional: Redirect immediately or let them click a link? 
            // User requested strict enforcement, but a friendly UI is better.
            // We'll show a "No plan selected" message instead of form.
        }
    }, [plan, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        let data = Object.fromEntries(formData.entries())

        // Add plan to payload
        data.plan = plan;

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                addNotification('Registration successful! Please login.', 'success');
                navigate('/login');
            } else {
                const err = await res.json();
                console.log('Registration failed', err)
                addNotification('Registration failed.', 'error');
            }
        } catch (err) {
            console.log('Error connecting to the server', err)
            addNotification('Error connecting to the server.', 'error');
        }
    }

    if (!plan) {
        return (
            <section className="main form-section" style={{ textAlign: 'center', paddingTop: '10rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>No Plan Selected</h1>
                <p style={{ marginBottom: '2rem', color: 'var(--font-color-dim)' }}>Please choose a membership plan to continue.</p>
                <Button to="/plans">View Plans</Button>
            </section>
        )
    }

    return (
        <section className="main form-section">
            <form onSubmit={handleSubmit}>
                <h1>
                    Register for <span className="red-text">{plan.split('-')[0].trim()}</span>
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

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    icon={Lock}
                    required
                />

                <InputField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    placeholder="+251 953 565 778"
                    icon={Phone}
                    required
                />

                <InputField
                    label="Payment method"
                    name="paymentMethod"
                    icon={CreditCard}
                    options={paymentOptions}
                    required
                />

                <Button type="submit" className="submit">Register & Join</Button>
            </form>

            <FloatingBall color="red" size={260} top="15%" left="10%" />
            <FloatingBall color="black" size={280} bottom="-5%" right="-10%" />

        </section>
    )
}
