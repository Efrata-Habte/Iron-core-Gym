import { MapPin, Mail, Phone } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const companyLinks = ['Privacy', 'Terms and Condition', 'Services', 'Guides and Rules']
const resourceLinks = ['Fitness Tools', 'Workout Instructions', 'Nutrition Guides', 'FAQ']
const programLinks = ['Weight Loss', 'Home Workout', 'Fitness Group', 'Challenges']

export default function Footer() {
    const { isDark } = useTheme()

    return (
        <footer className="border-t border-[var(--color-border)] px-[min(4%,8rem)] mt-48">
            {/* Upper Section */}
            <div className="flex flex-wrap justify-between items-center gap-4 py-6 border-b border-[var(--color-border-light)]">
                <div className="logo">
                    <img
                        className="w-[200px]"
                        src={isDark ? '/logos/IC-LOGO-VEC.svg' : '/logos/logo-black.png'}
                        alt="Iron Core logo"
                    />
                </div>

                <div className="flex items-center gap-8">
                    <span>
                        Follow <span className="red-text">us</span>
                    </span>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <img
                            className="w-7"
                            src={isDark ? '/logos/youtube-logo.svg' : '/logos/youtube-logo-black.png'}
                            alt="YouTube"
                        />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img
                            className="w-7"
                            src={isDark ? '/logos/instagram-logo.svg' : '/logos/insta-logo-black.png'}
                            alt="Instagram"
                        />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <img
                            className="w-7"
                            src={isDark ? '/logos/tiktok-logo.svg' : '/logos/tiktok-logo-black.png'}
                            alt="TikTok"
                        />
                    </a>
                </div>
            </div>

            {/* About Company Section - matching original: flex row, justify-between, pr-20 */}
            <div className="flex flex-wrap justify-between items-start gap-4 py-6 pr-20 text-gray-400">
                {/* Contact Info */}
                <ul className="list-none flex flex-col gap-5">
                    <li className="flex items-center gap-3">
                        <MapPin size={24} />
                        <span>Addis Ababa, Ethiopia</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Mail size={24} />
                        <span>ironcore.fitness@gmail.com</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Phone size={24} />
                        <span>+251 58 356 7322</span>
                    </li>
                </ul>

                {/* Company Links */}
                <ul className="list-none flex flex-col gap-5">
                    <span className="red-text text-lg">Company</span>
                    {companyLinks.map((item) => (
                        <li key={item} className="text-sm cursor-pointer hover:text-white transition-colors">
                            {item}
                        </li>
                    ))}
                </ul>

                {/* Resource Links */}
                <ul className="list-none flex flex-col gap-5">
                    <span className="red-text text-lg">Resources</span>
                    {resourceLinks.map((item) => (
                        <li key={item} className="text-sm cursor-pointer hover:text-white transition-colors">
                            {item}
                        </li>
                    ))}
                </ul>

                {/* Program Links */}
                <ul className="list-none flex flex-col gap-5">
                    <span className="red-text text-lg">Programs</span>
                    {programLinks.map((item) => (
                        <li key={item} className="text-sm cursor-pointer hover:text-white transition-colors">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Copyright */}
            <p className="text-center text-gray-400 text-sm pb-6 pt-8">
                Iron Core Fitness Center plc. 2025 © All rights reserved
            </p>
        </footer>
    )
}
