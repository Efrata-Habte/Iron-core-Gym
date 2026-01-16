export default function FloatingBall({ color = 'red', size = 100, top, bottom, left, right, className = '' }) {
    const colorClass = color === 'red' ? 'ball-red' : 'ball-black'

    const style = {
        width: `${size}px`,
        height: `${size}px`,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
    }

    return (
        <div
            className={`ball ${colorClass} ${className}`}
            style={style}
        />
    )
}
