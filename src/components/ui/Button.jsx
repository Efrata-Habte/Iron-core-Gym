import { Link } from 'react-router-dom'

export default function Button({ children, to, onClick, variant = 'outline', className = '', type = 'button' }) {
    const baseStyles = 'px-6 py-3 font-semibold text-lg rounded cursor-pointer transition-all duration-500 w-max'

    const variants = {
        outline: 'bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-700 hover:text-white hover:border-gray-400',
        filled: 'bg-red-500 text-white border-2 border-red-500 hover:bg-red-600',
        full: 'w-full bg-red-500 text-white border-2 border-red-500 hover:bg-red-600',
    }

    const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`

    if (to) {
        return (
            <Link to={to} className={combinedStyles}>
                {children}
            </Link>
        )
    }

    return (
        <button type={type} onClick={onClick} className={combinedStyles}>
            {children}
        </button>
    )
}
