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
        alert('Registration submitted!')
    }

    return (
        <section className="main form-section">
            <form onSubmit={handleSubmit}>
                <h1>
                    Member<span className="red-text">ship</span>
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

                <Button type="submit" className="submit">Submit</Button>
            </form>

            <FloatingBall color="red" size={260} top="15%" left="10%" />
            <FloatingBall color="black" size={280} bottom="-5%" right="-10%" />

        </section>
    )
}
