import { Link } from 'react-router-dom'
import { User, Mail } from 'lucide-react'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import FloatingBall from '../components/ui/FloatingBall'

export default function ContactPage() {
    const handleSubmit = (e) => {
        e.preventDefault()
        // Form submission logic will be added with backend
        alert('Message sent! (Backend integration pending)')
    }

    return (
        <section className="relative flex justify-center items-center py-16">
            <form
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col gap-4 p-8 rounded-2xl border border-gray-500/40 bg-gradient-to-br from-gray-500/40 to-transparent backdrop-blur-lg max-w-md w-full mx-4"
            >
                <h1 className="text-3xl text-center !mb-0 [&::before]:hidden">
                    Contact <span className="red-text">us</span>
                </h1>

                <hr className="border-0 border-b border-[var(--color-border)] my-2" />

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

                <p className="text-sm">
                    Are you a member?{' '}
                    <Link to="/plans" className="red-text underline underline-offset-2">
                        Get membership.
                    </Link>
                </p>

                <InputField
                    label="Message"
                    name="msg"
                    type="textarea"
                    placeholder="your message..."
                    required
                />

                <Button type="submit" variant="full" className="mt-5">
                    Submit
                </Button>
            </form>

            {/* Floating Balls */}
            <FloatingBall color="black" size={260} top="15%" left="10%" />
            <FloatingBall color="red" size={280} bottom="10%" right="10%" />
        </section>
    )
}
