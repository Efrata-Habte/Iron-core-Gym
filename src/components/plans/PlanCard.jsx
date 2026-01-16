import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function PlanCard({
    title,
    monthlyPrice,
    yearlyPrice,
    features,
    backgroundImage
}) {
    return (
        <div
            className="relative flex items-end bg-cover bg-center p-4 w-[400px] h-[550px] 
                 rounded-2xl border border-gray-400/30 shadow-lg mb-8"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: '50% 40%' }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />

            {/* Plan Content */}
            <div className="relative z-10 w-full flex flex-col gap-5 p-6 rounded-2xl border border-gray-200/30 bg-gradient-to-br from-gray-200/30 to-transparent backdrop-blur-lg text-white">
                {/* Title */}
                <h1 className="font-accent text-2xl text-center border-b border-gray-400/70 pb-3 !m-0 [&::before]:hidden">
                    {title}
                </h1>

                {/* Pricing */}
                <div className="flex justify-between">
                    <p className="bg-green-700 py-1 px-2 rounded-lg">{monthlyPrice}</p>
                    <p className="bg-green-700 py-1 px-2 rounded-lg">{yearlyPrice}</p>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 list-disc pl-5">
                    {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Button to="/register" variant="filled" className="w-full text-center">
                    Get membership
                </Button>
            </div>
        </div>
    )
}
