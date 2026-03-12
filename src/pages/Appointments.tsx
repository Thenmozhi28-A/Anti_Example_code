import { useState } from 'react'
import {
    MdAdd,
    MdSearch,
    MdDeleteOutline,
    MdCalendarToday,
    MdSchedule,
    MdPeople,
    MdCheckCircle,
    MdPendingActions,
    MdCancel
} from 'react-icons/md'
import Button from '../components/ui/Button'
import type { Appointment } from '../types/TypesForAll'
import NewAppointmentModal from '../components/NewAppointmentModal'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import AppointmentDetailsModal from '../components/AppointmentDetailsModal'
import Select from '../components/ui/Select'

export default function Appointments() {
    // State
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: "1", patientId: "1024", patientName: "Arun Kumar", scheduledTime: "09:00 AM", status: "Confirmed", reasonForVisit: "Fever and cold symptoms", doctorNotes: "", doctorType: "General Physician" },
        { id: "2", patientId: "1025", patientName: "Priya Sharma", scheduledTime: "10:00 AM", status: "Pending", reasonForVisit: "Annual health checkup", doctorNotes: "", doctorType: "Internal Medicine Specialist" },
        { id: "3", patientId: "1026", patientName: "Ravi Sundar", scheduledTime: "11:00 AM", status: "Confirmed", reasonForVisit: "Back pain evaluation", doctorNotes: "", doctorType: "Orthopedic Doctor" },
        { id: "4", patientId: "1027", patientName: "Meena Devi", scheduledTime: "12:00 PM", status: "Completed", reasonForVisit: "Blood pressure monitoring", doctorNotes: "", doctorType: "Cardiologist" },
        { id: "5", patientId: "1028", patientName: "Karthik Raja", scheduledTime: "01:00 PM", status: "Pending", reasonForVisit: "Diabetes follow-up", doctorNotes: "", doctorType: "Endocrinologist" },
        { id: "6", patientId: "1029", patientName: "Lakshmi Priya", scheduledTime: "02:00 PM", status: "Cancelled", reasonForVisit: "Skin allergy consultation", doctorNotes: "", doctorType: "Dermatologist" },
        { id: "7", patientId: "1030", patientName: "Suresh Babu", scheduledTime: "03:00 PM", status: "Confirmed", reasonForVisit: "Post-surgery review", doctorNotes: "", doctorType: "Cardiothoracic Surgeon" },
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'All' | Appointment['status']>('All')
    const [doctorTypeFilter, setDoctorTypeFilter] = useState('All Doctors')
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; appt: Appointment | null }>({
        isOpen: false,
        appt: null
    })
    const [showNewModal, setShowNewModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

    // Stats calculation
    const stats = [
        { label: 'Total', count: appointments.length, icon: <MdPeople size={20} />, color: 'border-slate-400' },
        { label: 'Confirmed', count: appointments.filter(a => a.status === 'Confirmed').length, icon: <MdCheckCircle size={20} className="text-blue-500" />, color: 'border-blue-500' },
        { label: 'Pending', count: appointments.filter(a => a.status === 'Pending').length, icon: <MdPendingActions size={20} className="text-yellow-500" />, color: 'border-yellow-500' },
        { label: 'Cancelled', count: appointments.filter(a => a.status === 'Cancelled').length, icon: <MdCancel size={20} className="text-red-500" />, color: 'border-red-500' },
    ]

    const filteredAppointments = appointments.filter(appt => {
        const matchesSearch = appt.patientName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'All' || appt.status === statusFilter
        const matchesDoctor = doctorTypeFilter === 'All Doctors' || appt.doctorType === doctorTypeFilter.replace(/^[^\s]+\s/, '') // remove emoji
        return matchesSearch && matchesStatus && matchesDoctor
    })

    const doctorPills = [
        "All Doctors",
        "Cardiologist",
        "Cardiac Surgeon",
        "Cardiothoracic Surgeon",
        "Pediatrician",
        "Neonatologist",
        "Pediatric Surgeon",
        "Neurologist",
        "Neurosurgeon",
        "Psychiatrist",
        "Orthopedic Doctor",
        "Rheumatologist",
        "General Physician",
        "Internal Medicine Specialist",
        "Family Medicine Doctor",
        "Gynecologist",
        "Obstetrician",
        "OB-GYN",
        "Ophthalmologist",
        "ENT Specialist",
        "Dermatologist",
        "Nephrologist",
        "Urologist",
        "Gastroenterologist",
        "Pulmonologist",
        "Endocrinologist",
        "Oncologist",
        "Hematologist",
        "Anesthesiologist",
        "Radiologist",
        "Pathologist"
    ]

    const confirmDelete = () => {
        if (deleteModal.appt) {
            setAppointments(prev => prev.filter(a => a.id !== deleteModal.appt!.id))
            setDeleteModal({ isOpen: false, appt: null })
        }
    }

    const handleSaveNewAppointment = (newAppt: Appointment) => {
        setAppointments(prev => [newAppt, ...prev])
        setShowNewModal(false)
    }

    const handleSaveAppointment = (updated: Appointment) => {
        setAppointments(prev => prev.map(apt => apt.id === updated.id ? updated : apt))
        setSelectedAppointment(updated)
    }

    const getStatusBadgeStyles = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-blue-100 text-blue-700'
            case 'Pending': return 'bg-yellow-100 text-yellow-700'
            case 'Cancelled': return 'bg-red-100 text-red-700'
            case 'Completed': return 'bg-green-100 text-green-700'
            default: return 'bg-slate-100 text-slate-700'
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Appointments</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Manage all your appointments</p>
                </div>
                <Button
                    onClick={() => setShowNewModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 border-none"
                >
                    <MdAdd size={20} />
                    New Appointment
                </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className={`bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 hover:border-l-4 ${stat.color} flex items-center gap-4`}>
                        <div className="bg-slate-50 p-3 rounded-xl">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900">{stat.count}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                    {/* Search */}
                    <div className="flex-1 space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                            Search Patient
                        </label>
                        <div className="relative group">
                            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Enter patient name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-transparent rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                aria-label="Search by patient name"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                            Filter by Status
                        </label>
                        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            {['All', 'Confirmed', 'Pending', 'Cancelled', 'Completed'].map((pill) => (
                                <button
                                    key={pill}
                                    onClick={() => setStatusFilter(pill as any)}
                                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === pill
                                        ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {pill}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Doctor Specialty Filter */}
                    <div className="xl:w-80">
                        <Select
                            label="Doctor Specialty"
                            options={doctorPills}
                            value={doctorTypeFilter}
                            onChange={setDoctorTypeFilter}
                            placeholder="All Specialists"
                        />
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={() => {
                            setSearchTerm('')
                            setStatusFilter('All')
                            setDoctorTypeFilter('All Doctors')
                        }}
                        className="xl:mb-0.5 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Appointments Table */}
            {filteredAppointments.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">PATIENT</th>
                                    <th className="px-6 py-4">TIME</th>
                                    <th className="px-6 py-4">DOCTOR</th>
                                    <th className="px-6 py-4">REASON FOR VISIT</th>
                                    <th className="px-6 py-4">STATUS</th>
                                    <th className="px-6 py-4 text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredAppointments.map((appt) => {
                                    const initials = appt.patientName.split(' ').map(n => n[0]).join('').toUpperCase()

                                    // Basic avatar color logic based on initials
                                    const initial = appt.patientName.charAt(0).toUpperCase()
                                    let avatarColor = 'bg-indigo-500'
                                    if ('ABCDE'.includes(initial)) avatarColor = 'bg-blue-500'
                                    else if ('FGHIJ'.includes(initial)) avatarColor = 'bg-emerald-500'
                                    else if ('KLMNO'.includes(initial)) avatarColor = 'bg-amber-500'
                                    else if ('PQRST'.includes(initial)) avatarColor = 'bg-rose-500'

                                    return (
                                        <tr key={appt.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0 ${avatarColor}`}>
                                                        {initials}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm leading-tight">{appt.patientName}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">ID: #{appt.patientId}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                                                    <MdSchedule className="text-gray-400" size={16} />
                                                    {appt.scheduledTime}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium whitespace-nowrap">
                                                    <span className="text-sm">🩺</span> {appt.doctorType}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-500 italic max-w-xs truncate">
                                                    {appt.reasonForVisit}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadgeStyles(appt.status)}`}>
                                                    {appt.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Button
                                                        onClick={() => setDeleteModal({ isOpen: true, appt })}
                                                        className="h-10 w-10 p-0 flex items-center justify-center rounded-xl bg-red-100 hover:bg-red-500 hover:text-white transition-all border-none shadow-sm shadow-red-100/10"
                                                        aria-label="Delete appointment"
                                                    >
                                                        <MdDeleteOutline size={18} />
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedAppointment(appt)
                                                            setShowDetailsModal(true)
                                                        }}
                                                        variant="outline"
                                                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm"                                                    >
                                                        View
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
                <div className="bg-white rounded-2xl p-20 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 animate-in fade-in duration-500">
                    <MdCalendarToday className="text-gray-300 mb-4" size={48} />
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">No appointments found</h3>
                    <p className="text-gray-500 mt-2 text-sm max-w-xs">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
            )}

            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                title="Delete Appointment"
                message={`Are you sure you want to remove ${deleteModal.appt?.patientName}'s appointment?`}
                confirmLabel="Yes, Delete"
                cancelLabel="No"
                onConfirm={confirmDelete}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
            />

            <NewAppointmentModal
                isOpen={showNewModal}
                onClose={() => setShowNewModal(false)}
                onSave={handleSaveNewAppointment}
            />

            <AppointmentDetailsModal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                appointment={selectedAppointment}
                onSave={handleSaveAppointment}
            />
        </div>
    )
}
