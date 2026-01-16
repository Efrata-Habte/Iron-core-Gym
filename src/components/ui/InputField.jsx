export default function InputField({
    label,
    name,
    type = 'text',
    placeholder,
    icon: Icon,
    required = false,
    options = null, // For select inputs
    maxLength,
    className = ''
}) {
    const inputBaseClass = 'w-full py-1 px-2 bg-transparent border-b border-current focus:outline-none focus:border-b-2'

    return (
        <div className={`input-container ${className}`}>
            <label htmlFor={name} className="block pb-1.5">
                {label}{required && '*'}
            </label>
            <div className="flex items-center gap-2">
                {Icon && <Icon size={24} className="flex-shrink-0" />}

                {options ? (
                    <select
                        name={name}
                        id={name}
                        className="w-full py-1 px-2 bg-transparent border border-dashed border-[var(--color-border)] text-current"
                    >
                        {options.map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-[var(--color-ic-dark-bg)]">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : type === 'textarea' ? (
                    <textarea
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        className="w-full h-24 py-1 px-2 bg-transparent border border-current rounded-lg resize-none"
                    />
                ) : (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className={inputBaseClass}
                    />
                )}
            </div>
        </div>
    )
}
