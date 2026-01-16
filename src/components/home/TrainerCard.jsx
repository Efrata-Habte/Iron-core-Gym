import GlassCard from '../ui/GlassCard'

export default function TrainerCard({
    name,
    years,
    headline,
    headlineAccent,
    quote,
    image,
    position = 'right'
}) {
    const isRight = position === 'right'

    return (
        // .trainer-wrapper: width: 80%, flex, padding-bottom: 6rem, position: relative
        // .right: justify-content: right | .left: justify-content: left
        <div className={`relative w-[80%] flex pb-24 ${isRight ? 'justify-end' : 'justify-start'}`}>
            {/* .trainer-card: flex, overflow: hidden, position: relative, width: 70%, min-width: 600px */}
            {/* .left .trainer-card: justify-content: end, text-align: end */}
            <GlassCard className={`relative flex overflow-hidden w-[70%] min-w-[600px] ${!isRight ? 'justify-end text-end' : ''}`}>
                {/* .trainer-text: flex column, gap: 2.8rem, max-width: 30rem, padding: 3rem 1.6rem */}
                {/* .left .trainer-text: align-items: end */}
                <div className={`flex flex-col gap-[2.8rem] max-w-[30rem] py-12 px-[1.6rem] ${!isRight ? 'items-end' : ''}`}>
                    {/* h1: margin-bottom: 0 | .left h1: width: fit-content */}
                    <h1 className={`section-heading !mb-0 ${!isRight ? 'w-fit' : ''}`}>
                        {headline}<br />
                        <span className="red-text">{headlineAccent}</span>
                    </h1>

                    {/* .trainer-text p: flex, gap: .8rem */}
                    <p className="flex gap-[0.8rem]">
                        {/* .quote: block, font-family: Catamaran, font-size: 3.6rem, line-height: 0, padding-top: 20px */}
                        <span className="block font-['Catamaran'] text-[3.6rem] leading-[0] pt-5">"</span>
                        {quote}
                    </p>

                    {/* .trainer: flex, gap: 4rem, letter-spacing: 2px, word-spacing: 10px */}
                    <div className="flex gap-16 tracking-[2px]" style={{ wordSpacing: '10px' }}>
                        {/* .trainer h3: font-weight: 400 */}
                        <h3 className="font-normal">{name}</h3>
                        {/* .working-yrs: bg yellow, color black, padding: 3px 8px, border-radius: 8px, word-spacing: 0, letter-spacing: 0 */}
                        <span className="bg-[hsl(60,98%,48%)] text-black py-[3px] px-2 rounded-lg tracking-normal" style={{ wordSpacing: '0' }}>
                            {years} yrs
                        </span>
                    </div>
                </div>

                {/* .trainer-card img: position: absolute, z-index: -1, transition: all .8s */}
                {/* hover: opacity .8, scale 1.08 */}
                {/* .right img: right: 0 | .left img: left: 0 */}
                <img
                    src={image}
                    alt={name}
                    className={`absolute -z-10 w-[400px] lg:w-[445px] transition-all duration-700 hover:opacity-80 hover:scale-[1.08] ${isRight ? 'right-0' : 'left-0'
                        }`}
                />
            </GlassCard>
        </div>
    )
}
