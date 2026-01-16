import { User, Mail, Lock, Phone, CreditCard } from 'lucide-react'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import FloatingBall from '../components/ui/FloatingBall'

const paymentOptions = [
    { value: 'telebirr', label: 'Telebirr' },
    { value: 'mobile', label: 'Mobile Banking' },
    { value: 'paypal', label: 'Paypal' },
]

export default function RegisterPage() {
    const handleSubmit = (e) => {
        e.preventDefault()
        // Form submission logic will be added with backend
        alert('Registration submitted! (Backend integration pending)')
    }

    return (
        <section className="relative flex justify-center items-center py-8">
            <form
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col gap-4 p-8 rounded-2xl border border-gray-500/40 bg-gradient-to-br from-gray-500/40 to-transparent backdrop-blur-lg max-w-md w-full mx-4"
            >
                <h1 className="text-3xl text-center !mb-0 [&::before]:hidden">
                    Member<span className="red-text">ship</span>
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

                <InputField
                    label="Username"
                    name="usrname"
                    placeholder="choose your username"
                    icon={User}
                    required
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="6 characters max"
                    maxLength={6}
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
                    name="pay-method"
                    icon={CreditCard}
                    options={paymentOptions}
                    required
                />

                <Button type="submit" variant="full" className="mt-5">
                    Submit
                </Button>
            </form>

            {/* Floating Balls */}
            <FloatingBall color="red" size={260} top="15%" left="10%" />
            <FloatingBall color="black" size={280} bottom="-5%" right="-10%" />
        </section>
    )
}
