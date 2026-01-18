export default function InputField({
    label,
    name,
    type = 'text',
    placeholder,
    icon: Icon,
    required = false,
    options = null,
    maxLength,
    className = ''
}) {
    // form.css expectation:
    // label (block)
    // .input-box (flex) -> svg, input/select/textarea
    // 
    // note: textarea might not be inside .input-box in original HTML if icon isn't involved, 
    // but form.css styles textarea globally.
    // Let's assume structure:
    // <div>
    //   <label>...</label>
    //   <div class="input-box">
    //      <Icon />
    //      <input/select/textarea />
    //   </div>
    // </div>

    return (
        <div className={className}>
            <label htmlFor={name}>
                {label}{required && '*'}
            </label>

            <div className="input-box">
                {Icon && <Icon strokeWidth={1.5} />}

                {options ? (
                    <select name={name} id={name}>
                        {options.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : type === 'textarea' ? (
                    <textarea
                        name={name}
                        id={name}
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        maxLength={maxLength}
                    />
                )}
            </div>
        </div>
    )
}
