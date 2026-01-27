import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function InputField({
    label,
    name,
    type = 'text',
    placeholder,
    icon: Icon,
    required = false,
    options = null,
    maxLength,
    className = '',
    ...res
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === 'password';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

            <div className="input-box" style={{ position: 'relative' }}>
                {Icon && <Icon strokeWidth={1.5} />}

                {options ? (
                    <select name={name} id={name} {...res}>
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
                        {...res}
                    />
                ) : (
                    <input
                        type={isPasswordField && showPassword ? 'text' : type}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        {...res}
                    />
                )}

                {isPasswordField && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                            padding: '0',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--font-color-dim, #999)',
                            display: 'flex',
                            alignItems: 'center',
                            zIndex: 100
                        }}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    )
}
