import { Link } from 'react-router-dom'

export default function Button({ children, to, onClick, type = 'button', className = '' }) {
    // common.css styles all <button> tags globally
    // We just need to render the tag. If it's a Link, we might need to ensure it wraps a button or looks like one.
    // In original HTML: <a href...><button>Get Membership</button></a>

    if (to) {
        return (
            <Link to={to} className={className}>
                <button>{children}</button>
            </Link>
        )
    }

    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    )
}
