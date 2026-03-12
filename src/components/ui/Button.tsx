import type { ButtonVariant, ButtonProps } from '../../types/TypesForAll'

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-gray-900 text-white rounded-lg py-4',
    outline:
        'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg py-4',
    ghost:
        'text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-2',
    pillActive:
        'bg-blue-600 text-white shadow-lg shadow-blue-100 border-blue-600 rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest',
    pillInactive:
        'bg-white text-slate-400 border border-slate-200 hover:border-slate-300 rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest',
    back:
        'bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-600 hover:bg-slate-100',
}

const Button = ({
    children,
    variant = 'primary',
    fullWidth = false,
    loading = false,
    disabled,
    className = '',
    ...props
}: ButtonProps) => {
    return (
        <button
            disabled={disabled || loading}
            className={[
                'flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold transition ',
                variantClasses[variant],
                fullWidth ? 'w-full' : '',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            {...props}
        >
            {loading ? 'Please wait…' : children}
        </button>
    )
}

export default Button
