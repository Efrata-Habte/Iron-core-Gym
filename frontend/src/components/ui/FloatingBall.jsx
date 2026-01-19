export default function FloatingBall({ color = 'red', size = 100, top, bottom, left, right, zIndex, className = '' }) {
    const colorClass = color === 'red' ? 'red' : 'black'

    const style = {
        width: `${size}px`,
        height: `${size}px`,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        zIndex: zIndex,
    }

    return (
        <div
            className={`ball ${colorClass} ${className}`}
            style={style}
        />
    )
}

