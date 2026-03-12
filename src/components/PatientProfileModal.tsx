import { useState, useEffect } from 'react'
import { MdClose, MdCake, MdBloodtype, MdPhone, MdCalendarToday, MdArrowBack } from 'react-icons/md'
import { BsGenderAmbiguous } from 'react-icons/bs'
import type { Patient, PatientProfileModalProps } from '../types/TypesForAll'
import Button from './ui/Button'
import UnifiedInput from './ui/FormInput'

export default function PatientProfileModal({ isOpen, onClose, patient, appointments, onSave }: PatientProfileModalProps) {
    if (!isOpen || !patient) return null

    const [isEditMode, setIsEditMode] = useState(false)
    const [editData, setEditData] = useState<Patient>(patient)

    useEffect(() => {
        if (patient) {
            setEditData(patient)
            setIsEditMode(false)
        }
    }, [patient])

    const handleClose = () => {
        setIsEditMode(false)
        setEditData(patient)
        onClose()
    }

    const handleSave = () => {
        if (editData && onSave) {
            onSave(editData)
        }
        setIsEditMode(false)
    }

    const initials = patient.patientName.split(' ').map(n => n[0]).join('').toUpperCase()

    const getBannerGradient = (bloodGroup: string) => {
        if (bloodGroup.startsWith('A') && !bloodGroup.startsWith('AB')) return 'from-red-400 to-red-600'
        if (bloodGroup.startsWith('B')) return 'from-blue-400 to-blue-600'
        if (bloodGroup.startsWith('O')) return 'from-green-400 to-green-600'
        if (bloodGroup.startsWith('AB')) return 'from-purple-400 to-purple-600'
        return 'from-gray-400 to-gray-600'
    }

    const getAvatarColor = (name: string) => {
        const initial = name.charAt(0).toUpperCase()
        if ('ABCDE'.includes(initial)) return 'bg-blue-500'
        if ('FGHIJ'.includes(initial)) return 'bg-emerald-500'
        if ('KLMNO'.includes(initial)) return 'bg-amber-500'
        if ('PQRST'.includes(initial)) return 'bg-rose-500'
        return 'bg-indigo-500'
    }

    const getStatusBadgeClass = (status: string) => {
        if (status === 'Confirmed') return 'bg-blue-100 text-blue-700'
        if (status === 'Pending') return 'bg-yellow-100 text-yellow-700'
        if (status === 'Cancelled') return 'bg-red-100 text-red-700'
        if (status === 'Completed') return 'bg-green-100 text-green-700'
        return 'bg-gray-100 text-gray-700'
    }

    const patientAppointments = appointments.filter(a => a.patientId === patient.patientId)

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={handleClose}>
            <div
                className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-4 duration-300"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
                    {isEditMode && (
                        <Button
                            variant="ghost"
                            onClick={() => setIsEditMode(false)}
                            className="p-1.5 rounded-lg flex-shrink-0"
                            aria-label="Back to view mode"
                        >
                            <MdArrowBack size={20} />
                        </Button>
                    )}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${getAvatarColor(patient.patientName)}`}>
                        {initials}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-gray-900">
                            {isEditMode ? "Edit Patient" : patient.patientName}
                        </h2>
                        {!isEditMode && (
                            <>
                                <p className="text-sm text-gray-400 mt-0.5">
                                    ID: #{patient.patientId}
                                </p>
                                <div className={`mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${patient.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                    {patient.status}
                                </div>
                            </>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        onClick={handleClose}
                        className="p-1.5 rounded-lg flex-shrink-0"
                        aria-label="Close modal"
                    >
                        <MdClose size={20} />
                    </Button>
                </div>

                {!isEditMode ? (
                    <>

                        {/* Info Grid */}
                        <div className="bg-gray-50 rounded-2xl p-4 mx-6 mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                    <MdCake size={14} /> AGE
                                </p>
                                <p className="text-sm font-semibold text-gray-800">{patient.age}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                    <BsGenderAmbiguous size={14} /> GENDER
                                </p>
                                <p className="text-sm font-semibold text-gray-800">{patient.gender}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                    <MdBloodtype size={14} /> BLOOD GROUP
                                </p>
                                <span className={`inline-block px-2 py-0.5 rounded-lg text-xs font-bold ${getBannerGradient(patient.bloodGroup).split(' ')[0].replace('from', 'text').replace('400', '600')} bg-white border border-gray-200 shadow-sm`}>
                                    {patient.bloodGroup}
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                    <MdPhone size={14} /> PHONE
                                </p>
                                <p className="text-sm font-semibold text-gray-800">{patient.phone}</p>
                            </div>
                        </div>

                        {/* Last Visit Row */}
                        <div className="mx-6 mt-3 flex justify-between items-center bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
                            <div className="flex items-center gap-2">
                                <MdCalendarToday size={14} className="text-gray-400" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">LAST VISIT</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">{patient.lastVisit}</span>
                        </div>

                        {/* Appointment History */}
                        <div className="mx-6 mt-6 mb-8">
                            <h3 className="font-semibold text-gray-900 tracking-tight mb-4">Appointment History</h3>

                            {patientAppointments.length > 0 ? (
                                <div className="space-y-2">
                                    {patientAppointments.map(appt => (
                                        <div key={appt.id} className="bg-gray-50 rounded-xl px-4 py-3 flex justify-between items-center border border-gray-100">
                                            <div className="min-w-0 pr-4">
                                                <p className="text-sm font-bold text-gray-800">{appt.scheduledTime}</p>
                                                <p className="text-xs text-gray-500 mt-0.5 truncate">{appt.reasonForVisit}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${getStatusBadgeClass(appt.status)}`}>
                                                    {appt.status}
                                                </span>
                                                <p className="text-xs text-gray-500 font-medium mt-1 flex items-center justify-end gap-1">
                                                    <span className="opacity-75">🩺</span> {appt.doctorType}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                    <div className="bg-gray-50 p-3 rounded-full mb-3">
                                        <MdCalendarToday size={24} className="text-gray-300" />
                                    </div>
                                    <p className="text-sm text-gray-400 font-medium">No appointment history</p>
                                </div>
                            )}
                        </div>

                    </>
                ) : (
                    <div className="p-6 space-y-4">
                        <UnifiedInput
                            id="patientName"
                            label="Patient Name"
                            type="text"
                            value={editData?.patientName || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData(prev => prev ? { ...prev, patientName: e.target.value } : prev)}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <UnifiedInput
                                id="age"
                                label="Age"
                                type="number"
                                value={editData?.age || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData(prev => prev ? { ...prev, age: parseInt(e.target.value) || 0 } : prev)}
                            />
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="gender">Gender</label>
                                <select
                                    id="gender"
                                    value={editData?.gender || ''}
                                    onChange={e => setEditData(prev => prev ? { ...prev, gender: e.target.value as any } : prev)}
                                    className="border border-gray-200 rounded-xl px-4 py-2.5 w-full text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="bloodGroup">Blood Group</label>
                                <select
                                    id="bloodGroup"
                                    value={editData?.bloodGroup || ''}
                                    onChange={e => setEditData(prev => prev ? { ...prev, bloodGroup: e.target.value as Patient['bloodGroup'] } : prev)}
                                    className="border border-gray-200 rounded-xl px-4 py-2.5 w-full text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
                                >
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                            <UnifiedInput
                                id="phone"
                                label="Phone"
                                type="text"
                                value={editData?.phone || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData(prev => prev ? { ...prev, phone: e.target.value } : prev)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="status">Status</label>
                            <select
                                id="status"
                                value={editData?.status || ''}
                                onChange={e => setEditData(prev => prev ? { ...prev, status: e.target.value as Patient['status'] } : prev)}
                                className="border border-gray-200 rounded-xl px-4 py-2.5 w-full text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="border-t border-gray-100 px-6 py-4 flex justify-between items-center bg-white">
                    {!isEditMode ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                className="px-6 py-2.5 text-gray-600 font-bold text-xs uppercase tracking-widest border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Close
                            </Button>
                            <Button
                                onClick={() => setIsEditMode(true)}
                                className="px-6 py-2.5 bg-gray-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-colors shadow-lg border-none"
                            >
                                Edit Patient
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditMode(false)}
                                className="px-6 py-2.5 text-gray-600 font-bold text-xs uppercase tracking-widest border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="px-6 py-2.5 bg-gray-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-colors shadow-lg border-none"
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
