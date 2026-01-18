export default function GlassCard({ children, className = '' }) {
    // .glass class is defined in common.css
    return (
        <div className={`glass ${className}`}>
            {children}
        </div>
    )
}
