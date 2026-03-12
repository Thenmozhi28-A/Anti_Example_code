import { useState, useId } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import type { InputProps } from '../../types/TypesForAll'

const UnifiedInput = ({
    label,
    registration,
    error,
    rightLabel,
    type = 'text',
    placeholder,
    id: propsId,
    ...rest
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const generatedId = useId()
    const id = propsId || generatedId
    const isPassword = type === 'password'

    return (
        <div className="w-full">
            <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor={id} className="text-[15px] font-semibold text-gray-700">
                    {label}
                </label>
                {rightLabel}
            </div>

            <div className="relative">
                <input
                    {...registration}
                    {...rest}
                    id={id}
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    autoComplete="new-password"

                    className={[
                        'w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition',
                        'focus:border-gray-800 focus:ring-2 focus:ring-gray-100 hover:border-slate-900 hover:bg-slate-50',
                        isPassword ? 'pr-11' : '',
                    ].join(' ')}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                )}
            </div>

            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
            )}
        </div>
    )
}

export default UnifiedInput
