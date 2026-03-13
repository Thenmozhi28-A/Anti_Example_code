import { MdClose } from 'react-icons/md'
import Button from './ui/Button'
import type { ViewPrescriptionModalProps } from '../types/TypesForAll'

export default function ViewPrescriptionModal({ isOpen, onClose, prescription }: ViewPrescriptionModalProps) {
    if (!isOpen || !prescription) return null

    const getStatusBadgeStyles = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700'
            case 'Completed': return 'bg-blue-100 text-blue-700'
            case 'Expired': return 'bg-red-100 text-red-700'
            default: return 'bg-slate-100 text-slate-700'
        }
    }

    const initials = prescription.patientName.split(' ').map(n => n[0]).join('').toUpperCase()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Prescription Details</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Full prescription information</p>
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
                            <h3 className="text-lg font-black text-slate-900 leading-tight">{prescription.patientName}</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Patient ID: #{prescription.patientId}</p>
                        </div>
                        <div className="ml-auto">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadgeStyles(prescription.status)}`}>
                                {prescription.status}
                            </span>
                        </div>
                    </div>

                    {/* Medicine Info */}
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1.5">Medicine</p>
                        <p className="text-lg font-black text-blue-900">{prescription.medicineName}</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="bg-blue-100 text-blue-700 rounded-lg px-3 py-1 text-xs font-black uppercase tracking-widest">
                                {prescription.dosage}
                            </span>
                            <span className="text-sm font-bold text-blue-600 italic">
                                {prescription.frequency}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Start Date</p>
                            <p className="text-sm font-bold text-slate-900">{prescription.startDate}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">End Date</p>
                            <p className="text-sm font-bold text-slate-900">{prescription.endDate}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Prescribing Doctor</p>
                        <p className="text-sm font-bold text-slate-900">{prescription.doctorType}</p>
                    </div>

                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Notes</p>
                        <p className="text-sm font-medium text-slate-500 italic">
                            {prescription.notes || 'No additional notes recorded for this prescription.'}
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
