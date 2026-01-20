import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { X, Menu, LogOut } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/plans', label: 'Plans' },
    { to: '/trainers', label: 'Trainers' },
    { to: '/contact', label: 'Contact us' },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isDark } = useTheme()
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        setIsMenuOpen(false)
        navigate('/')
    }

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

                {user ? (
                    <>
                        {user.role === 'admin' && (
                            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'curr' : '')}>
                                Admin
                            </NavLink>
                        )}
                        <button onClick={handleLogout} className="logout-btn">
                            <LogOut size={20} />
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className={({ isActive }) => (isActive ? 'curr' : '')}>
                        Login
                    </NavLink>
                )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="menu block md:hidden" onClick={() => setIsMenuOpen(true)}>
                <Menu size={28} className="text-current cursor-pointer" />
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="narrow">
                    <div className="narrow-top">
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

                    <hr style={{ width: '80%', margin: '1rem 0', opacity: 0.2 }} />

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <NavLink
                                    to="/admin"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) => (isActive ? 'curr' : '')}
                                >
                                    Admin Panel
                                </NavLink>
                            )}
                            <button onClick={handleLogout} className="mobile-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) => (isActive ? 'curr' : '')}
                        >
                            Login
                        </NavLink>
                    )}
                </nav>
            )}
        </header>
    )
}
