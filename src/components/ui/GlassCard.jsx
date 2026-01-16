export default function GlassCard({ children, className = '' }) {
    return (
        <div className={`glass rounded-lg ${className}`}>
            {children}
        </div>
    )
}
