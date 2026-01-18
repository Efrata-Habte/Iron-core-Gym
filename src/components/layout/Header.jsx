import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/plans', label: 'Plans' },
    { to: '/contact', label: 'Contact us' },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isDark } = useTheme()

    return (
        <header>
            <div className="logo-container">
                <img
                    className="logo"
                    src={isDark ? '/logos/IC-LOGO-VEC-header.svg' : '/logos/header-logo-black.png'}
                    alt="Iron Core logo"
                />
            </div>

            {/* Desktop Navigation */}
            <nav>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => (isActive ? 'curr' : '')}
                    >
                        {link.label}
                    </NavLink>
                ))}
                {/* Helper for fade animation in original css? 
            Original CSS says: nav * { animation: fadeIn ... }
        */}
            </nav>

            {/* Mobile Menu Button - original CSS uses .menu class which is display:none on desktop */}
            <div className="menu block md:hidden" onClick={() => setIsMenuOpen(true)}>
                <Menu size={28} className="text-current cursor-pointer" />
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="narrow">
                    <div className="narrow-top">
                        {/* Original design likely had a close button here or outside */}
                        <X size={32} className="cursor-pointer" onClick={() => setIsMenuOpen(false)} />
                    </div>

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) => (isActive ? 'curr' : '')}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    )
}
