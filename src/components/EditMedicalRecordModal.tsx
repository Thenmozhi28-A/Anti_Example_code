import { useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import Button from './ui/Button'
import { useUpdateRecordMutation } from '../store/api/medicalRecordsApi'
import toast from 'react-hot-toast'
import FormInput from './ui/FormInput'
import type { MedicalRecord, EditMedicalRecordModalProps } from '../types/TypesForAll'

export default function EditMedicalRecordModal({ isOpen, onClose, record }: EditMedicalRecordModalProps) {
    const [updateRecord, { isLoading }] = useUpdateRecordMutation()
    const [formData, setFormData] = useState<Partial<MedicalRecord>>({})

    const formatDateForInput = (dateStr: string) => {
        if (!dateStr) return ''
        const months: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
            'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
            'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        }
        const parts = dateStr.split(' ')
        if (parts.length === 3) {
            return `${parts[2]}-${months[parts[1]]}-${parts[0].padStart(2, '0')}`
        }
        return dateStr
    }

    const formatDateForDisplay = (dateStr: string) => {
        if (!dateStr) return ''
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const [year, month, day] = dateStr.split('-')
        return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`
    }

    useEffect(() => {
        if (record) {
            setFormData({ ...record, date: formatDateForInput(record.date) })
        }
    }, [record])

    const doctorTypes = [
        "Cardiologist", "Cardiac Surgeon", "Cardiothoracic Surgeon", "Pediatrician",
        "Neonatologist", "Pediatric Surgeon", "Neurologist", "Neurosurgeon",
        "Psychiatrist", "Orthopedic Doctor", "Rheumatologist", "General Physician",
        "Internal Medicine Specialist", "Family Medicine Doctor", "Gynecologist",
        "Obstetrician", "OB-GYN", "Ophthalmologist", "ENT Specialist",
        "Dermatologist", "Nephrologist", "Urologist", "Gastroenterologist",
        "Pulmonologist", "Endocrinologist", "Oncologist", "Hematologist",
        "Anesthesiologist", "Radiologist", "Pathologist"
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.patientName || !formData.patientId || !formData.diagnosis || !record?.id) {
            toast.error('Please fill in all required fields')
            return
        }

        try {
            await updateRecord({ id: record.id, ...formData, date: formatDateForDisplay(formData.date || '') }).unwrap()
            toast.success('Record updated ✓')
            onClose()
        } catch (err) {
            toast.error('Something went wrong ✗')
        }
    }

    if (!isOpen || !record) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Edit Medical Record</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Update clinical documentation</p>
                    </div>
                    <Button variant="ghost" onClick={onClose} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-slate-600">
                        <MdClose size={24} />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Patient Name *"
                            required
                            type="text"
                            value={formData.patientName || ''}
                            onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                            placeholder="Enter patient name"
                        />
                        <FormInput
                            label="Patient ID *"
                            required
                            type="text"
                            value={formData.patientId || ''}
                            onChange={e => setFormData({ ...formData, patientId: e.target.value })}
                            placeholder="e.g. 1024"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Record Type</label>
                            <select
                                title="Record Type"
                                value={formData.recordType || 'Lab Report'}
                                onChange={e => setFormData({ ...formData, recordType: e.target.value as any })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option>Lab Report</option>
                                <option>Prescription</option>
                                <option>Diagnosis</option>
                                <option>Surgery</option>
                                <option>Scan/X-Ray</option>
                            </select>
                        </div>
                        <FormInput
                            label="Date"
                            type="date"
                            value={formData.date || ''}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Doctor Type</label>
                            <select
                                title="Doctor Type"
                                value={formData.doctorType || 'General Physician'}
                                onChange={e => setFormData({ ...formData, doctorType: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none cursor-pointer"
                            >
                                {doctorTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status</label>
                            <select
                                title="Status"
                                value={formData.status || 'Active'}
                                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Diagnosis *</label>
                        <textarea
                            required
                            rows={3}
                            value={formData.diagnosis || ''}
                            onChange={e => setFormData({ ...formData, diagnosis: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none"
                            placeholder="Detailed diagnosis information"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Notes (Optional)</label>
                        <textarea
                            rows={2}
                            value={formData.notes || ''}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none"
                            placeholder="Additional notes"
                        />
                    </div>
                </form>

                <div className="px-8 py-6 bg-slate-50 flex items-center justify-end gap-3 border-t border-slate-100">
                    <Button variant="outline" onClick={onClose} className="px-6 py-2.5 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        loading={isLoading}
                        className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}
