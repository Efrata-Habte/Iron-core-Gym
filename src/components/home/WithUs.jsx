import { Dumbbell, Users, ShowerHead, BicepsFlexed, Wheat, HeartPlus } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const amenities = [
    { icon: Dumbbell, label: 'FULL EQUIPMENT' },
    { icon: Users, label: 'GREAT COMMUNITY' },
    { icon: HeartPlus, label: 'IMPROVED HEALTH' },
    { icon: ShowerHead, label: 'HOT SHOWER' },
    { icon: BicepsFlexed, label: 'GOOD PHYSIQUE' },
    { icon: Wheat, label: 'NUTRITION TIPS' },
]

const stats = [
    { value: '11+', label: 'years of experience', className: 'yrs' },
    { value: '29', label: 'trainers' },
    { value: '300+', label: 'trainees' },
]

export default function WithUs() {
    return (
        <section className="wu-dashboard">
            <SectionHeading centered>
                WITH <span className="red-text">US</span>
            </SectionHeading>

            <div className="wu-dash-container">
                <div className="comodities">
                    {amenities.map(({ icon: Icon, label }) => (
                        <div key={label} className="como-cont">
                            <Icon size={28} strokeWidth={2.5} />
                            <p className="como-text">{label}</p>
                        </div>
                    ))}
                </div>

                <hr />

                <div className="stats-cont">
                    {stats.map(({ value, label, className }) => (
                        <div key={label} className={`stat ${className || ''}`}>
                            <p className="big-num">{value}</p>
                            <p className="stat-text">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
