import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import Button from './ui/Button'
import { useAddPrescriptionMutation } from '../store/api/prescriptionsApi'
import toast from 'react-hot-toast'
import type { Prescription } from '../types/TypesForAll'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function AddPrescriptionModal({ isOpen, onClose }: Props) {
    const [addPrescription, { isLoading }] = useAddPrescriptionMutation()
    const [formData, setFormData] = useState<Partial<Prescription>>({
        patientName: '',
        patientId: '',
        medicineName: '',
        dosage: '',
        frequency: 'Once daily',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        doctorType: 'General Physician',
        status: 'Active',
        notes: ''
    })

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
        if (!formData.patientName || !formData.patientId || !formData.medicineName || !formData.dosage) {
            toast.error('Please fill in all required fields')
            return
        }

        try {
            await addPrescription(formData).unwrap()
            toast.success('Prescription added ✓')
            onClose()
            setFormData({
                patientName: '',
                patientId: '',
                medicineName: '',
                dosage: '',
                frequency: 'Once daily',
                startDate: new Date().toISOString().split('T')[0],
                endDate: '',
                doctorType: 'General Physician',
                status: 'Active',
                notes: ''
            })
        } catch (err) {
            toast.error('Something went wrong ✗')
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Add Prescription</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Create new patient prescription</p>
                    </div>
                    <Button variant="ghost" onClick={onClose} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-slate-600">
                        <MdClose size={24} />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Patient Name *</label>
                            <input
                                required
                                type="text"
                                value={formData.patientName}
                                onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                placeholder="Enter patient name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Patient ID *</label>
                            <input
                                required
                                type="text"
                                value={formData.patientId}
                                onChange={e => setFormData({ ...formData, patientId: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                placeholder="e.g. 1024"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Medicine Name *</label>
                            <input
                                required
                                type="text"
                                value={formData.medicineName}
                                onChange={e => setFormData({ ...formData, medicineName: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                placeholder="e.g. Amoxicillin"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Dosage *</label>
                            <input
                                required
                                type="text"
                                value={formData.dosage}
                                onChange={e => setFormData({ ...formData, dosage: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                placeholder="e.g. 500mg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Frequency</label>
                            <select
                                title="Frequency"
                                value={formData.frequency}
                                onChange={e => setFormData({ ...formData, frequency: e.target.value as any })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option>Once daily</option>
                                <option>Twice daily</option>
                                <option>Three times daily</option>
                                <option>Four times daily</option>
                                <option>As needed</option>
                                <option>Every 8 hours</option>
                                <option>Every 12 hours</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status</label>
                            <select
                                title="Status"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Expired">Expired</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Start Date</label>
                            <input
                                type="date"
                                title="Start Date"
                                placeholder="YYYY-MM-DD"
                                value={formData.startDate}
                                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">End Date</label>
                            <input
                                type="date"
                                title="End Date"
                                placeholder="YYYY-MM-DD"
                                value={formData.endDate}
                                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Doctor Type</label>
                        <select
                            title="Doctor Type"
                            value={formData.doctorType}
                            onChange={e => setFormData({ ...formData, doctorType: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none cursor-pointer"
                        >
                            {doctorTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Notes (Optional)</label>
                        <textarea
                            rows={2}
                            value={formData.notes}
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
                        Save Prescription
                    </Button>
                </div>
            </div>
        </div>
    )
}
