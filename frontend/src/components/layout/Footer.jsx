import { MapPin, Mail, Phone } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const companyLinks = ['Privacy', 'Terms and Condition', 'Services', 'Guides and Rules']
const resourceLinks = ['Fitness Tools', 'Workout Instructions', 'Nutrition Guides', 'FAQ']
const programLinks = ['Weight Loss', 'Home Workout', 'Fitness Group', 'Challenges']

export default function Footer() {
    const { isDark } = useTheme()

    return (
        <footer>
            <div className="upper">
                <div className="logo">
                    <img
                        width="200px"
                        src={isDark ? '/logos/IC-LOGO-VEC.svg' : '/logos/logo-black.png'}
                        alt="Iron Core logo"
                    />
                </div>

                <div className="follow-us">
                    <span>
                        Follow <span className="red-text">us</span>
                    </span>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src={isDark ? '/logos/youtube-logo.svg' : '/logos/youtube-logo-black.png'}
                            alt="YouTube"
                        />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src={isDark ? '/logos/instagram-logo.svg' : '/logos/insta-logo-black.png'}
                            alt="Instagram"
                        />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src={isDark ? '/logos/tiktok-logo.svg' : '/logos/tiktok-logo-black.png'}
                            alt="TikTok"
                        />
                    </a>
                </div>
            </div>

            <div className="about-company">
                <ul className="with-icon">
                    <li>
                        <MapPin size={24} />
                        <span>Addis Ababa, Ethiopia</span>
                    </li>
                    <li>
                        <Mail size={24} />
                        <span>ironcore.fitness@gmail.com</span>
                    </li>
                    <li>
                        <Phone size={24} />
                        <span>+251 58 356 7322</span>
                    </li>
                </ul>

                <ul className="no-icon">
                    <span className="red-text">Company</span>
                    {companyLinks.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <ul className="no-icon">
                    <span className="red-text">Resources</span>
                    {resourceLinks.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <ul className="no-icon">
                    <span className="red-text">Programs</span>
                    {programLinks.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <p>Iron Core Fitness Center plc. 2025 © All rights reserved</p>
        </footer>
    )
}
