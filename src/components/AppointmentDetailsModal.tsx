import { useState, useEffect } from 'react'
import { MdClose, MdEventNote, MdAssignment, MdLocalHospital, MdArrowBack } from 'react-icons/md'
import type { AppointmentDetailsModalProps } from '../types/TypesForAll'
import Button from './ui/Button'

export default function AppointmentDetailsModal({ isOpen, onClose, appointment, onSave }: AppointmentDetailsModalProps) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [editData, setEditData] = useState(appointment)

    useEffect(() => {
        if (appointment) {
            setEditData(appointment)
            setIsEditMode(false)
        }
    }, [appointment])

    const handleSave = () => {
        if (editData && onSave) {
            onSave(editData)
        }
        setIsEditMode(false)
    }

    const handleClose = () => {
        setIsEditMode(false)
        setEditData(appointment)
        onClose()
    }

    if (!isOpen || !appointment) return null

    const initials = appointment.patientName.split(' ').map(n => n[0]).join('').toUpperCase()

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-blue-100 text-blue-700'
            case 'Pending': return 'bg-yellow-100 text-yellow-700'
            case 'Cancelled': return 'bg-red-100 text-red-700'
            case 'Completed': return 'bg-green-100 text-green-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const getAvatarColor = (name: string) => {
        const initial = name.charAt(0).toUpperCase()
        if ('ABCDE'.includes(initial)) return 'bg-blue-500'
        if ('FGHIJ'.includes(initial)) return 'bg-emerald-500'
        if ('KLMNO'.includes(initial)) return 'bg-amber-500'
        if ('PQRST'.includes(initial)) return 'bg-rose-500'
        return 'bg-indigo-500'
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto animate-in fade-in duration-200" onClick={handleClose}>
            <div
                className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-auto my-20 p-8 pt-6 relative animate-in slide-in-from-bottom-4 duration-300"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        {isEditMode && (
                            <Button
                                aria-label="Go back"
                                variant="ghost"
                                onClick={() => setIsEditMode(false)}
                                className="p-1 -ml-2 flex-shrink-0"
                            >
                                <MdArrowBack size={24} />
                            </Button>
                        )}
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">
                            {isEditMode ? "Edit Appointment" : "Appointment Details"}
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClose}
                        aria-label="Close modal"
                    >
                        <MdClose size={24} />
                    </Button>
                </div>

                {/* Body: Section 1 - Patient Info */}
                <div className="flex items-center gap-5 mb-8">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner ${getAvatarColor(appointment.patientName)}`}>
                        {initials}
                    </div>
                    <div>
                        <p className="text-xl font-bold text-gray-900 tracking-tight">{appointment.patientName}</p>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-400 font-medium">ID: #{appointment.patientId}</span>
                            <span className="text-gray-300">•</span>
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusStyle(appointment.status)}`}>
                                {appointment.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-gray-100 mb-8" />

                {/* Body: Section 2 - Info Grid */}
                {!isEditMode ? (
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                                <MdEventNote size={14} className="text-gray-400" />
                                Scheduled Time
                            </p>
                            <p className="text-sm font-bold text-gray-700">{appointment.scheduledTime}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                                <MdLocalHospital size={14} className="text-gray-400" />
                                Doctor / Specialist
                            </p>
                            <p className="text-sm font-bold text-gray-700 line-clamp-2 flex items-center gap-1.5">
                                {appointment.doctorType}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                                <MdAssignment size={14} className="text-gray-400" />
                                Reason for Visit
                            </p>
                            <p className="text-sm font-bold text-gray-700 line-clamp-2">{appointment.reasonForVisit}</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="editTime" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Scheduled Time</label>
                            <input
                                id="editTime"
                                type="time"
                                value={editData?.scheduledTime || ''}
                                onChange={e => setEditData(prev => prev ? { ...prev, scheduledTime: e.target.value } : null)}
                                className="border border-gray-200 rounded-xl px-4 py-2.5 w-full text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="editStatus" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Status</label>
                            <select
                                id="editStatus"
                                value={editData?.status || 'Confirmed'}
                                onChange={e => setEditData(prev => prev ? { ...prev, status: e.target.value as any } : null)}
                                className="border border-gray-200 rounded-xl px-4 py-2.5 w-full text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                            >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="editDoctor" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Doctor / Specialist</label>
                            <select
                                id="editDoctor"
                                value={editData?.doctorType || ''}
                                onChange={e => setEditData(prev => prev ? { ...prev, doctorType: e.target.value } : null)}
                                className="border border-gray-200 rounded-xl px-4 py-2.5 w-full text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                            >
                                <option value="">Select doctor type...</option>
                                <optgroup label="Heart Related">
                                    <option value="Cardiologist">Cardiologist</option>
                                    <option value="Cardiac Surgeon">Cardiac Surgeon</option>
                                    <option value="Cardiothoracic Surgeon">Cardiothoracic Surgeon</option>
                                </optgroup>
                                <optgroup label="Children">
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Neurosurgeon">Neurosurgeon</option>
                                    <option value="Psychiatrist">Psychiatrist</option>
                                </optgroup>
                                <optgroup label="Bones & Muscles">
                                    <option value="Orthopedic Doctor">Orthopedic Doctor</option>
                                    <option value="Rheumatologist">Rheumatologist</option>
                                </optgroup>
                                <optgroup label="General & Internal">
                                    <option value="General Physician">General Physician</option>
                                    <option value="Internal Medicine Specialist">Internal Medicine Specialist</option>
                                    <option value="Family Medicine Doctor">Family Medicine Doctor</option>
                                </optgroup>
                                <optgroup label="Women">
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Obstetrician">Obstetrician</option>
                                    <option value="OB-GYN">OB-GYN</option>
                                </optgroup>
                                <optgroup label="Eye, Ear, Nose">
                                    <option value="Ophthalmologist">Ophthalmologist</option>
                                    <option value="ENT Specialist">ENT Specialist</option>
                                </optgroup>
                                <optgroup label="Other Specialists">
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Nephrologist">Nephrologist</option>
                                    <option value="Urologist">Urologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                    <option value="Pulmonologist">Pulmonologist</option>
                                    <option value="Endocrinologist">Endocrinologist</option>
                                    <option value="Oncologist">Oncologist</option>
                                    <option value="Hematologist">Hematologist</option>
                                    <option value="Anesthesiologist">Anesthesiologist</option>
                                    <option value="Radiologist">Radiologist</option>
                                    <option value="Pathologist">Pathologist</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="editReason" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Reason for Visit</label>
                            <textarea
                                id="editReason"
                                rows={2}
                                value={editData?.reasonForVisit || ''}
                                onChange={e => setEditData(prev => prev ? { ...prev, reasonForVisit: e.target.value } : null)}
                                className="border border-gray-200 rounded-xl px-4 py-2.5 w-full text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white resize-none"
                            />
                        </div>
                    </div>
                )}

                {/* Body: Section 3 - Doctor Notes */}
                <div className="mb-2">
                    {!isEditMode ? (
                        <>
                            <p className="text-sm font-bold text-gray-900 tracking-tight mb-3">Doctor Notes / Diagnosis</p>
                            {appointment.doctorNotes ? (
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-gray-700 leading-relaxed font-medium">
                                    {appointment.doctorNotes}
                                </div>
                            ) : (
                                <p className="text-sm italic text-gray-400 font-medium p-4 bg-gray-50 rounded-xl border border-gray-100 border-dashed">No notes added yet</p>
                            )}
                        </>
                    ) : (
                        <div>
                            <label htmlFor="editNotes" className="text-sm font-bold text-gray-900 tracking-tight block mb-3">Doctor Notes / Diagnosis</label>
                            <textarea
                                id="editNotes"
                                rows={3}
                                placeholder="Enter notes or diagnosis..."
                                value={editData?.doctorNotes || ''}
                                onChange={e => setEditData(prev => prev ? { ...prev, doctorNotes: e.target.value } : null)}
                                className="border border-gray-200 rounded-xl px-4 py-2.5 w-full text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white resize-none"
                            />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    {!isEditMode ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all shadow-sm"
                            >
                                Close
                            </Button>
                            <Button
                                onClick={() => setIsEditMode(true)}
                                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-lg border-none"
                            >
                                Manage Appointment
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditMode(false)}
                                className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all shadow-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-lg border-none"
                            >
                                Save Changes
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
