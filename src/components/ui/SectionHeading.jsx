export default function SectionHeading({ children, className = '', centered = false }) {
    return (
        <h1
            className={`section-heading ${centered ? 'text-center mx-auto w-fit' : ''} ${className}`}
        >
            {children}
        </h1>
    )
}
