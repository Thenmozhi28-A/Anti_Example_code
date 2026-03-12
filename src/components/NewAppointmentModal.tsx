import { useState, useId } from 'react'
import { MdClose } from 'react-icons/md'
import Button from './ui/Button'
import FormInput from './ui/FormInput'
import type { Appointment, NewAppointmentModalProps } from '../types/TypesForAll'

const NewAppointmentModal = ({ isOpen, onClose, onSave }: NewAppointmentModalProps) => {
    const [patientName, setPatientName] = useState('')
    const [patientId, setPatientId] = useState('')
    const [scheduledTime, setScheduledTime] = useState('')
    const [status, setStatus] = useState<Appointment['status']>('Confirmed')
    const [doctorType, setDoctorType] = useState('')
    const [reasonForVisit, setReasonForVisit] = useState('')
    const [doctorNotes, setDoctorNotes] = useState('')

    const [errors, setErrors] = useState<Record<string, string>>({})

    const statusId = useId()
    const doctorTypeId = useId()
    const reasonId = useId()
    const notesId = useId()

    if (!isOpen) return null

    const handleSave = () => {
        const newErrors: Record<string, string> = {}
        if (!patientName.trim()) newErrors.patientName = 'Patient Name is required'
        if (!patientId.trim()) newErrors.patientId = 'Patient ID is required'
        if (!scheduledTime.trim()) newErrors.scheduledTime = 'Scheduled Time is required'
        if (!doctorType) newErrors.doctorType = 'Doctor Type is required'
        if (!reasonForVisit.trim()) newErrors.reasonForVisit = 'Reason for Visit is required'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        const newAppointment: Appointment = {
            id: Date.now().toString(),
            patientId,
            patientName,
            scheduledTime,
            status,
            doctorType,
            reasonForVisit,
            doctorNotes
        }

        onSave(newAppointment)
        onClose()
        // Reset state
        setPatientName('')
        setPatientId('')
        setScheduledTime('')
        setStatus('Confirmed')
        setDoctorType('')
        setReasonForVisit('')
        setDoctorNotes('')
        setErrors({})
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center overflow-y-auto pt-10 pb-5 px-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight px-3">New Appointment</h2>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <MdClose size={24} />
                    </Button>
                </div>

                {/* Form Body */}
                <div className="px-8 py-3 space-y-4 ">
                    {/* Patient Name */}
                    <FormInput
                        label="Patient Name"
                        placeholder="Enter patient name"
                        value={patientName}
                        onChange={(e: any) => setPatientName(e.target.value)}
                        error={errors.patientName}
                    />

                    {/* Patient ID */}
                    <FormInput
                        label="Patient ID"
                        placeholder="e.g. 1024"
                        value={patientId}
                        onChange={(e: any) => setPatientId(e.target.value)}
                        error={errors.patientId}
                    />

                    <div className="grid grid-cols-2 gap-6">
                        {/* Scheduled Time */}
                        <FormInput
                            label="Scheduled Time"
                            type="time"
                            value={scheduledTime}
                            onChange={(e: any) => setScheduledTime(e.target.value)}
                            error={errors.scheduledTime}
                        />

                        {/* Status */}
                        <div className="w-full">
                            <label htmlFor={statusId} className="text-[15px] font-semibold text-gray-700 block mb-1.5">
                                Status
                            </label>
                            <select
                                id={statusId}
                                value={status}
                                onChange={(e) => setStatus(e.target.value as Appointment['status'])}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-800 focus:ring-2 focus:ring-gray-100 cursor-pointer"
                                aria-label="Appointment status"
                            >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Doctor Type */}
                    <div className="w-full">
                        <label htmlFor={doctorTypeId} className="text-[15px] font-semibold text-gray-700 block mb-1.5">
                            Doctor / Specialist
                        </label>
                        <select
                            id={doctorTypeId}
                            value={doctorType}
                            onChange={(e) => setDoctorType(e.target.value)}
                            className={`w-full rounded-lg border ${errors.doctorType ? 'border-red-500' : 'border-gray-300'} px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-800 focus:ring-2 focus:ring-gray-100 cursor-pointer`}
                            aria-label="Doctor Type"
                        >
                            <option value="">Select doctor type...</option>
                            <optgroup label="Heart Related">
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Cardiac Surgeon">Cardiac Surgeon</option>
                                <option value="Cardiothoracic Surgeon">Cardiothoracic Surgeon</option>
                            </optgroup>
                            <optgroup label="Children">
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Neonatologist">Neonatologist</option>
                                <option value="Pediatric Surgeon">Pediatric Surgeon</option>
                            </optgroup>
                            <optgroup label="Brain & Nerves">
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
                        {errors.doctorType && (
                            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.doctorType}</p>
                        )}
                    </div>

                    {/* Reason for Visit */}
                    <div className="w-full">
                        <label htmlFor={reasonId} className="text-[15px] font-semibold text-gray-700 block mb-1.5">
                            Reason for Visit
                        </label>
                        <textarea
                            id={reasonId}
                            rows={3}
                            placeholder="Enter reason for visit..."
                            value={reasonForVisit}
                            onChange={(e) => setReasonForVisit(e.target.value)}
                            className={`w-full rounded-lg border ${errors.reasonForVisit ? 'border-red-500' : 'border-gray-300'} px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-800 focus:ring-2 focus:ring-gray-100`}
                        />
                        {errors.reasonForVisit && (
                            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.reasonForVisit}</p>
                        )}
                    </div>

                    {/* Doctor Notes */}
                    <div className="w-full">
                        <label htmlFor={notesId} className="text-[15px] font-semibold text-gray-700 block mb-1.5">
                            Doctor Notes (Optional)
                        </label>
                        <textarea
                            id={notesId}
                            rows={3}
                            placeholder="Enter doctor notes or diagnosis..."
                            value={doctorNotes}
                            onChange={(e) => setDoctorNotes(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-800 focus:ring-2 focus:ring-gray-100"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="py-3  px-4 border-t border-gray-100 flex items-center justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-8 border-none text-slate-500 hover:bg-slate-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        className="px-8 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 text-white border-none"
                    >
                        Save Appointment
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NewAppointmentModal
