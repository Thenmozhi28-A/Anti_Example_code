import { useState } from 'react'

import {
    MdSearch,
    MdAdd,
    MdPeople,
    MdCheckCircle,
    MdFlashOn,
    MdWarning,
    MdDeleteOutline
} from 'react-icons/md'
import Button from '../components/ui/Button'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import AddPatientModal from '../components/AddPatientModal'
import PatientProfileModal from '../components/PatientProfileModal'
import type { Patient, Appointment } from '../types/TypesForAll'

const INITIAL_PATIENTS: Patient[] = [
    { id: "1", patientId: "1024", patientName: "Arun Kumar", age: 32, gender: "Male", bloodGroup: "A+", phone: "9876543210", lastVisit: "24 Feb 2026", status: "Active" },
    { id: "2", patientId: "1025", patientName: "Priya Sharma", age: 28, gender: "Female", bloodGroup: "B+", phone: "9876543211", lastVisit: "23 Feb 2026", status: "Active" },
    { id: "3", patientId: "1026", patientName: "Ravi Sundar", age: 45, gender: "Male", bloodGroup: "O+", phone: "9876543212", lastVisit: "22 Feb 2026", status: "Active" },
    { id: "4", patientId: "1027", patientName: "Meena Devi", age: 52, gender: "Female", bloodGroup: "AB+", phone: "9876543213", lastVisit: "21 Feb 2026", status: "Inactive" },
    { id: "5", patientId: "1028", patientName: "Karthik Raja", age: 38, gender: "Male", bloodGroup: "B-", phone: "9876543214", lastVisit: "20 Feb 2026", status: "Active" },
    { id: "6", patientId: "1029", patientName: "Lakshmi Priya", age: 41, gender: "Female", bloodGroup: "A-", phone: "9876543215", lastVisit: "19 Feb 2026", status: "Active" },
    { id: "7", patientId: "1030", patientName: "Suresh Babu", age: 60, gender: "Male", bloodGroup: "O-", phone: "9876543216", lastVisit: "18 Feb 2026", status: "Inactive" },
]

const MOCK_APPOINTMENTS: Appointment[] = [
    { id: "1", patientId: "1024", patientName: "Arun Kumar", scheduledTime: "09:00 AM", status: "Confirmed", reasonForVisit: "Fever and cold symptoms", doctorNotes: "Patient has high fever (102F). Prescribed paracetamol.", doctorType: "General Physician" },
    { id: "2", patientId: "1025", patientName: "Priya Sharma", scheduledTime: "10:00 AM", status: "Pending", reasonForVisit: "Annual health checkup", doctorNotes: "", doctorType: "Internal Medicine Specialist" },
    { id: "3", patientId: "1026", patientName: "Ravi Sundar", scheduledTime: "11:00 AM", status: "Confirmed", reasonForVisit: "Back pain evaluation", doctorNotes: "Suspected muscle strain. Physical therapy recommended.", doctorType: "Orthopedic Doctor" },
    { id: "4", patientId: "1027", patientName: "Meena Devi", scheduledTime: "12:00 PM", status: "Completed", reasonForVisit: "Blood pressure monitoring", doctorNotes: "BP is stable at 120/80. Continue existing medication.", doctorType: "Cardiologist" },
    { id: "5", patientId: "1028", patientName: "Karthik Raja", scheduledTime: "01:00 PM", status: "Pending", reasonForVisit: "Diabetes follow-up", doctorNotes: "", doctorType: "Endocrinologist" },
    { id: "6", patientId: "1029", patientName: "Lakshmi Priya", scheduledTime: "02:00 PM", status: "Cancelled", reasonForVisit: "Skin allergy consultation", doctorNotes: "", doctorType: "Dermatologist" },
    { id: "7", patientId: "1030", patientName: "Suresh Babu", scheduledTime: "03:00 PM", status: "Confirmed", reasonForVisit: "Post-surgery review", doctorNotes: "Healing well. No signs of infection.", doctorType: "Cardiothoracic Surgeon" },
]

export default function Patients() {
    const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All')
    const [showAddModal, setShowAddModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, patient: Patient | null }>({
        isOpen: false,
        patient: null
    })
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

    // Stats Logic
    const stats = [
        { label: 'Total Patients', value: patients.length, icon: <MdPeople size={24} />, color: 'border-slate-500' },
        { label: 'Active', value: patients.filter(p => p.status === 'Active').length, icon: <MdCheckCircle size={24} className="text-emerald-500" />, color: 'border-emerald-500' },
        { label: 'New This Month', value: 2, icon: <MdFlashOn size={24} className="text-blue-500" />, color: 'border-blue-500' },
        { label: 'Critical', value: 1, icon: <MdWarning size={24} className="text-red-500" />, color: 'border-red-500' },
    ]

    const filteredPatients = patients.filter(p => {
        const matchesSearch = p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.patientId.includes(searchTerm)
        const matchesStatus = statusFilter === 'All' || p.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleSavePatient = (newPatient: Patient) => {
        setPatients(prev => [newPatient, ...prev])
        setShowAddModal(false)
    }

    const handleUpdatePatient = (updated: Patient) => {
        setPatients(prev => prev.map(p => p.id === updated.id ? updated : p))
        setSelectedPatient(updated)
    }

    const confirmDelete = () => {
        if (deleteModal.patient) {
            setPatients(prev => prev.filter(p => p.id !== deleteModal.patient?.id))
            setDeleteModal({ isOpen: false, patient: null })
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
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Patients</h1>
                    <p className="text-slate-500 font-bold mt-1">Manage all your patients</p>
                </div>
                <Button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white rounded-2xl px-8 py-4 font-black uppercase tracking-widest text-[11px] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all border-none"
                >
                    <MdAdd size={20} />
                    Add Patient
                </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className={`bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 hover:border-l-4 ${stat.color} flex items-center gap-4`}>
                        <div className="bg-slate-50 p-3 rounded-xl">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            aria-label="Search by name or ID"
                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {['All', 'Active', 'Inactive'].map((pill) => (
                            <Button
                                key={pill}
                                variant={statusFilter === pill ? 'pillActive' : 'pillInactive'}
                                onClick={() => setStatusFilter(pill as any)}
                            >
                                {pill}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Patient Table */}
            {filteredPatients.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Patient</th>
                                    <th className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Age</th>
                                    <th className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Gender</th>
                                    <th className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Blood Group</th>
                                    <th className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Phone</th>
                                    <th className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Last Visit</th>
                                    <th className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                                    <th className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.map((patient) => {
                                    const initials = patient.patientName.split(' ').map(n => n[0]).join('').toUpperCase()

                                    // Blood Group Badge
                                    let bgBadgeClass = 'bg-gray-100 text-gray-600'
                                    if (patient.bloodGroup.startsWith('A') && !patient.bloodGroup.startsWith('AB')) bgBadgeClass = 'bg-red-100 text-red-600'
                                    else if (patient.bloodGroup.startsWith('B')) bgBadgeClass = 'bg-blue-100 text-blue-600'
                                    else if (patient.bloodGroup.startsWith('O')) bgBadgeClass = 'bg-green-100 text-green-600'
                                    else if (patient.bloodGroup.startsWith('AB')) bgBadgeClass = 'bg-purple-100 text-purple-600'

                                    return (
                                        <tr key={patient.id} className="border-b border-gray-50 hover:bg-gray-50 transition group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${getAvatarColor(patient.patientName)} shadow-inner`}>
                                                        {initials}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{patient.patientName}</p>
                                                        <p className="text-xs text-gray-400 font-medium">ID: #{patient.patientId}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-700 font-medium">{patient.age}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`font-semibold ${patient.gender === 'Male' ? 'text-blue-500' : patient.gender === 'Female' ? 'text-pink-500' : 'text-gray-500'}`}>
                                                    {patient.gender}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${bgBadgeClass}`}>
                                                    {patient.bloodGroup}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-600 text-sm font-medium">{patient.phone}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-600 text-sm font-medium">{patient.lastVisit}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${patient.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                    {patient.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedPatient(patient)
                                                            setShowProfileModal(true)
                                                        }}
                                                        variant="outline"
                                                        className="px-4 py-2 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                                    >
                                                        View Profile
                                                    </Button>
                                                    <Button
                                                        onClick={() => setDeleteModal({ isOpen: true, patient })}
                                                        className="h-10 w-10 p-0 flex items-center justify-center rounded-xl bg-red-100 hover:bg-red-500 hover:text-white transition-all border-none shadow-sm shadow-red-100/10"
                                                        aria-label="Delete patient"
                                                    >
                                                        <MdDeleteOutline size={18} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 animate-in fade-in zoom-in-95 duration-500">
                    <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <MdPeople className="text-slate-300" size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-none">No patients found</h3>
                    <p className="text-gray-500 font-medium mt-4 max-w-xs leading-relaxed">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
            )}

            {/* Modals */}
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                title="Delete Patient"
                message={`Are you sure you want to delete ${deleteModal.patient?.patientName}? This action cannot be undone.`}
                confirmLabel="Yes, Delete"
                cancelLabel="No"
                onConfirm={confirmDelete}
                onClose={() => setDeleteModal({ isOpen: false, patient: null })}
            />

            <AddPatientModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleSavePatient}
            />

            <PatientProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                patient={selectedPatient}
                appointments={MOCK_APPOINTMENTS}
                onSave={handleUpdatePatient}
            />
        </div>
    )
}
