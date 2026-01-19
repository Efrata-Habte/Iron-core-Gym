import { Link } from 'react-router-dom'
import { User, Mail } from 'lucide-react'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import FloatingBall from '../components/ui/FloatingBall'


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function ContactPage() {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        try {
            const res = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (res.ok) alert('Message sent successfully!')
            else alert('Failed to send message.')
        } catch (err) {
            alert('Error connecting to the server.')
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

                <Button type="submit" className="submit">Submit</Button>
            </form>

            {/* Balls using vanilla classes */}
            <FloatingBall color="black" size={260} top="15%" left="10%" />
            <FloatingBall color="red" size={280} bottom="10%" right="10%" />

        </section>
    )
}
