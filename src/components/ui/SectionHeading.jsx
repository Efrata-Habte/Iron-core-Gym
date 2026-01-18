export default function SectionHeading({ children, centered = false }) {
    // h1 styling is global in common.css, but we might want to check alignment
    // original: <h1>OUR <span class="red-text">TRAINERS</span></h1>
    // h1 has margin-bottom: 4rem. 
    // centering might typically be done by parent flex align-items: center

    return (
        <h1 style={centered ? { textAlign: 'center' } : {}}>
            {children}
        </h1>
    )
}
