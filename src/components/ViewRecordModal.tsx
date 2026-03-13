import { MdClose } from 'react-icons/md'
import Button from './ui/Button'
import type { ViewRecordModalProps } from '../types/TypesForAll'

export default function ViewRecordModal({ isOpen, onClose, record }: ViewRecordModalProps) {
    if (!isOpen || !record) return null

    const getStatusBadgeStyles = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700'
            case 'Completed': return 'bg-blue-100 text-blue-700'
            case 'Critical': return 'bg-red-100 text-red-700'
            default: return 'bg-slate-100 text-slate-700'
        }
    }

    const getTypeBadgeStyles = (type: string) => {
        switch (type) {
            case 'Lab Report': return 'bg-blue-100 text-blue-700'
            case 'Prescription': return 'bg-purple-100 text-purple-700'
            case 'Diagnosis': return 'bg-orange-100 text-orange-700'
            case 'Surgery': return 'bg-red-100 text-red-700'
            case 'Scan/X-Ray': return 'bg-teal-100 text-teal-700'
            default: return 'bg-slate-100 text-slate-700'
        }
    }

    const initials = record.patientName.split(' ').map(n => n[0]).join('').toUpperCase()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Record Details</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Full clinical information</p>
                    </div>
                    <Button variant="ghost" onClick={onClose} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-slate-600">
                        <MdClose size={24} />
                    </Button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Patient Header */}
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">
                            {initials}
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900 leading-tight">{record.patientName}</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Patient ID: #{record.patientId}</p>
                        </div>
                        <div className="ml-auto flex flex-col items-end gap-2">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadgeStyles(record.status)}`}>
                                {record.status}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getTypeBadgeStyles(record.recordType)}`}>
                                {record.recordType}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Date Created</p>
                            <p className="text-sm font-bold text-slate-900">{record.date}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Physician involved</p>
                            <p className="text-sm font-bold text-slate-900">{record.doctorType}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Diagnosis</p>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium text-slate-600 leading-relaxed italic">
                            "{record.diagnosis}"
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Additional Notes</p>
                        <p className="text-sm font-medium text-slate-500 italic">
                            {record.notes || 'No additional notes recorded for this record.'}
                        </p>
                    </div>
                </div>

                <div className="px-8 py-6 bg-slate-50 flex items-center justify-end border-t border-slate-100">
                    <Button onClick={onClose} className="px-10 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        Close Details
                    </Button>
                </div>
            </div>
        </div>
    )
}
