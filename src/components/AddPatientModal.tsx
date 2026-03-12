import { useState, useId } from 'react'
import { MdClose } from 'react-icons/md'
import Button from './ui/Button'
import FormInput from './ui/FormInput'
import type { Patient, AddPatientModalProps } from '../types/TypesForAll'

const AddPatientModal = ({ isOpen, onClose, onSave }: AddPatientModalProps) => {
    const [patientName, setPatientName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male')
    const [bloodGroup, setBloodGroup] = useState<'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'>('A+')
    const [phone, setPhone] = useState('')
    const [status, setStatus] = useState<'Active' | 'Inactive'>('Active')

    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const genderId = useId()
    const bloodGroupId = useId()
    const statusId = useId()

    if (!isOpen) return null

    const handleSave = () => {
        const newErrors: { [key: string]: string } = {}
        if (!patientName.trim()) newErrors.patientName = 'Patient Name is required'
        if (!age) newErrors.age = 'Age is required'
        if (!phone.trim()) newErrors.phone = 'Phone number is required'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        const newPatient: Patient = {
            id: Date.now().toString(),
            patientId: (1031 + Math.floor(Math.random() * 100)).toString(), // Mock ID generation
            patientName,
            age: parseInt(age),
            gender,
            bloodGroup,
            phone,
            status,
            lastVisit: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        }

        onSave(newPatient)
        resetForm()
    }

    const resetForm = () => {
        setPatientName('')
        setAge('')
        setGender('Male')
        setBloodGroup('A+')
        setPhone('')
        setStatus('Active')
        setErrors({})
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center overflow-y-auto pt-10 pb-5 px-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add New Patient</h2>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            resetForm()
                            onClose()
                        }}
                        aria-label="Close modal"
                    >
                        <MdClose size={24} />
                    </Button>
                </div>

                {/* Form Body */}
                <div className="p-8 space-y-5">
                    <FormInput
                        label="Patient Name"
                        placeholder="e.g. Rahul Sharma"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        error={errors.patientName}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormInput
                            label="Age"
                            type="number"
                            placeholder="e.g. 25"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            error={errors.age}
                        />
                        <div className="space-y-2">
                            <label htmlFor={genderId} className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Gender</label>
                            <select
                                id={genderId}
                                value={gender}
                                onChange={(e) => setGender(e.target.value as any)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-800 focus:ring-2 focus:ring-gray-100 hover:border-slate-900 bg-white"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor={bloodGroupId} className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Blood Group</label>
                            <select
                                id={bloodGroupId}
                                value={bloodGroup}
                                onChange={(e) => setBloodGroup(e.target.value as any)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-800 focus:ring-2 focus:ring-gray-100 hover:border-slate-900 bg-white"
                            >
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor={statusId} className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Status</label>
                            <select
                                id={statusId}
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-800 focus:ring-2 focus:ring-gray-100 hover:border-slate-900 bg-white"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <FormInput
                        label="Phone Number"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={errors.phone}
                    />
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            resetForm()
                            onClose()
                        }}
                        className="border-none bg-slate-50 hover:bg-slate-100 py-3 text-xs font-black uppercase tracking-widest"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 py-3 text-xs font-black uppercase tracking-widest border-none px-8"
                    >
                        Save Patient
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddPatientModal
