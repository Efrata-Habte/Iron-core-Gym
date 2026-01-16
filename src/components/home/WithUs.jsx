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
    { value: '11+', label: 'years of experience', span: true },
    { value: '29', label: 'trainers' },
    { value: '300+', label: 'trainees' },
]

export default function WithUs() {
    return (
        // section.wu-dashboard: flex column, align-items center, padding: 3rem 12px
        <section className="flex flex-col items-center py-12 px-3">
            <SectionHeading centered>
                WITH <span className="red-text">US</span>
            </SectionHeading>

            {/* .wu-dash-container: flex, justify-content center, gap: 4vw */}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-[4vw]">
                {/* .comodities: grid 2 cols x 3 rows, row-gap: 3rem, column-gap: 3vw */}
                <div className="grid grid-cols-2 grid-rows-3 gap-y-12 gap-x-[3vw]">
                    {amenities.map(({ icon: Icon, label }) => (
                        // .como-cont: flex, align-items center, gap: 1.4rem
                        <div key={label} className="flex items-center gap-[1.4rem]">
                            {/* .como-cont svg: width: 28px, height: auto */}
                            <Icon size={28} strokeWidth={2.5} className="w-7 h-auto" />
                            <p className="como-text">{label}</p>
                        </div>
                    ))}
                </div>

                {/* hr: border-left: 1px solid var(--border-color) */}
                <hr className="hidden lg:block w-0 h-40 border-l border-[var(--color-border)]" />

                {/* .stats-cont: grid 2x2, gap: 1rem, text-align center */}
                <div className="grid grid-cols-2 grid-rows-2 gap-4 text-center mt-8 lg:mt-0">
                    {stats.map(({ value, label, span }) => (
                        // .stat: bg, padding: 1.6rem 1rem, border-radius: .8rem
                        // .stat.yrs: grid-column: 1 / 3
                        <div
                            key={label}
                            className={`bg-[var(--color-ic-dark-stat)] py-[1.6rem] px-4 rounded-[0.8rem] ${span ? 'col-span-2' : ''}`}
                        >
                            {/* .stat .big-num: font-size: 4.6rem, font-weight: 600, padding: 2px */}
                            <p className="text-[4.6rem] font-semibold p-0.5 leading-none">{value}</p>
                            <p className="stat-text text-sm">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
