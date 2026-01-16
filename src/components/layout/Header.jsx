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
        <header className="sticky top-0 z-50 flex items-center justify-between h-[99px] px-[min(4%,8rem)] gap-5 overflow-hidden">
            {/* Logo */}
            <div className="logo-container">
                <img
                    className="w-48 h-auto"
                    src={isDark ? '/logos/IC-LOGO-VEC-header.svg' : '/logos/header-logo-black.png'}
                    alt="Iron Core logo"
                />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-between bg-[#382222] text-white py-3 px-8 border border-[#C00000] rounded-[2.8rem] w-[80%] h-[57px]">
                {navLinks.map((link, index) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `block py-1.5 px-1.5 text-white no-underline transition-all duration-300 ${isActive ? 'border-b-[3px] border-[var(--color-ic-red)]' : ''
                            }`
                        }
                        style={{
                            animation: `fade-in 0.7s ease-out ${index * 0.1}s forwards`,
                            opacity: 0,
                        }}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 cursor-pointer bg-transparent border-none"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
            >
                <Menu size={28} className="text-current" />
            </button>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <nav className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center gap-8 md:hidden">
                    <button
                        className="absolute top-6 right-6 cursor-pointer bg-transparent border-none"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={32} className="text-white" />
                    </button>

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-2xl text-white no-underline py-2 px-4 ${isActive ? 'border-b-[3px] border-[var(--color-ic-red)]' : ''
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    )
}
