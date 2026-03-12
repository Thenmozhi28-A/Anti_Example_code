import Button from './Button'
import type { ConfirmationModalProps } from '../../types/TypesForAll'
import { MdWarning, MdLogout, MdDeleteOutline } from 'react-icons/md'

const ConfirmationModal = ({
    isOpen,
    title,
    message,
    confirmLabel,
    cancelLabel = 'No, Cancel',
    variant = 'danger',
    onConfirm,
    onClose
}: ConfirmationModalProps) => {
    if (!isOpen) return null

    const getIcon = () => {
        if (title.toLowerCase().includes('logout')) return <MdLogout size={32} />
        if (title.toLowerCase().includes('delete')) return <MdDeleteOutline size={32} />
        return <MdWarning size={32} />
    }

    const confirmButtonClass = variant === 'danger'
        ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200'
        : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'

    const iconBgClass = variant === 'danger' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="text-center">
                    <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${iconBgClass}`}>
                        {getIcon()}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-slate-500 font-medium leading-relaxed">
                        {message}
                    </p>
                </div>
                <div className="mt-8 flex gap-3">
                    <Button
                        variant="outline"
                        fullWidth
                        onClick={onClose}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={onConfirm}
                        className={confirmButtonClass}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
