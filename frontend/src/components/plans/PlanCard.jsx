import Button from '../ui/Button'

export default function PlanCard({
    title,
    monthlyPrice,
    yearlyPrice,
    features,
    typeClass, // 'basic', 'pro', or 'plus' - derived from props or logic?
    // User data suggests CSS classes .basic, .pro, .plus set the background image
    // So I should accept a className prop or infer it
}) {
    // In CSS: .plan-container.basic { bg-image... }
    // I need to map title to class or pass it

    // Mapping helper
    let bgClass = 'basic'
    if (title.includes('PRO')) bgClass = 'pro'
    if (title.includes('TRAINER+')) bgClass = 'plus'

    return (
        <div className={`plan-container ${bgClass}`}>
            <div className="cover"></div>

            <div className="plan">
                <h1>{title}</h1>

                <div className="price">
                    <p>{monthlyPrice}</p>
                    <p>{yearlyPrice}</p>
                </div>

                <ul>
                    {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>

                <Button to={`/register?plan=${encodeURIComponent(title)}`}>Get membership</Button>
            </div>
        </div>
    )
}
