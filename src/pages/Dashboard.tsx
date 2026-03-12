import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import {
    MdDeleteOutline,
    MdPeople,
    MdEventNote,
    MdFactCheck,
    MdDescription,
    MdAdd,
    MdListAlt
} from 'react-icons/md'
import NewAppointmentModal from '../components/NewAppointmentModal'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import AppointmentDetailsModal from '../components/AppointmentDetailsModal'
import type { Appointment } from '../types/TypesForAll'

const INITIAL_APPOINTMENTS: Appointment[] = [
    { id: "1", patientId: "1024", patientName: "Arun Kumar", scheduledTime: "09:00 AM", status: "Confirmed", reasonForVisit: "Fever and cold symptoms", doctorNotes: "Patient has high fever (102F). Prescribed paracetamol.", doctorType: "General Physician" },
    { id: "2", patientId: "1025", patientName: "Priya Sharma", scheduledTime: "10:00 AM", status: "Pending", reasonForVisit: "Annual health checkup", doctorNotes: "", doctorType: "Internal Medicine Specialist" },
    { id: "3", patientId: "1026", patientName: "Ravi Sundar", scheduledTime: "11:00 AM", status: "Confirmed", reasonForVisit: "Back pain evaluation", doctorNotes: "Suspected muscle strain. Physical therapy recommended.", doctorType: "Orthopedic Doctor" },
    { id: "4", patientId: "1027", patientName: "Meena Devi", scheduledTime: "12:00 PM", status: "Completed", reasonForVisit: "Blood pressure monitoring", doctorNotes: "BP is stable at 120/80. Continue existing medication.", doctorType: "Cardiologist" },
    { id: "5", patientId: "1028", patientName: "Karthik Raja", scheduledTime: "01:00 PM", status: "Pending", reasonForVisit: "Diabetes follow-up", doctorNotes: "", doctorType: "Endocrinologist" },
    { id: "6", patientId: "1029", patientName: "Lakshmi Priya", scheduledTime: "02:00 PM", status: "Cancelled", reasonForVisit: "Skin allergy consultation", doctorNotes: "", doctorType: "Dermatologist" },
    { id: "7", patientId: "1030", patientName: "Suresh Babu", scheduledTime: "03:00 PM", status: "Confirmed", reasonForVisit: "Post-surgery review", doctorNotes: "Healing well. No signs of infection.", doctorType: "Cardiothoracic Surgeon" },
]

export default function Dashboard() {
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, apptId: '', patientName: '' })
    const [showAppointmentModal, setShowAppointmentModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

    const todayDate = "Thursday, 26 Feb 2026"

    const stats = [
        { title: "Total Patients", value: "1,284", icon: <MdPeople size={20} />, color: 'border-slate-400' },
        { title: "Today's Appointments", value: appointments.length.toString(), icon: <MdEventNote size={20} className="text-blue-500" />, color: 'border-blue-500' },
        { title: "Pending Results", value: "43", icon: <MdFactCheck size={20} className="text-yellow-500" />, color: 'border-yellow-500' },
        { title: "New Prescriptions", value: "12", icon: <MdDescription size={20} className="text-emerald-500" />, color: 'border-emerald-500' },
    ]

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-blue-100 text-blue-700 border-blue-500'
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-500'
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-500'
            case 'Completed': return 'bg-green-100 text-green-700 border-green-500'
            default: return 'bg-gray-100 text-gray-700 border-gray-500'
        }
    }

    const handleDeleteClick = (id: string, name: string) => {
        setDeleteModal({ isOpen: true, apptId: id, patientName: name })
    }

    const confirmDelete = () => {
        setAppointments(prev => prev.filter(appt => appt.id !== deleteModal.apptId))
        setDeleteModal({ isOpen: false, apptId: '', patientName: '' })
    }

    const handleView = (appt: Appointment) => {
        setSelectedAppointment(appt)
        setShowDetailsModal(true)
    }

    const handleSaveNewAppointment = (newAppt: Appointment) => {
        setAppointments(prev => [newAppt, ...prev])
        setShowAppointmentModal(false)
    }

    const handleSaveAppointment = (updated: Appointment) => {
        setAppointments(prev => prev.map(apt => apt.id === updated.id ? updated : apt))
        setSelectedAppointment(updated)
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* 1. TOP BAR */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-100 pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Welcome back...!</p>
                </div>
                <div className="flex flex-col items-end justify-end gap-3">
                    <p className="text-slate-500 font-black text-xs uppercase tracking-widest italic">{todayDate}</p>
                    <div className="flex flex-wrap justify-end items-center gap-2">
                        <Button
                            onClick={() => setShowAppointmentModal(true)}
                            variant='outline'
                            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-black rounded-xl font-black uppercase tracking-widest text-[10px] shadow-blue-100 transition-all group"
                        >
                            <MdAdd size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                            New Appt
                        </Button>
                        {/* <Button
                            onClick={() => navigate('/patients')}

                            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-white rounded-xl font-black uppercase tracking-widest text-[10px]  shadow-md shadow-emerald-100 transition-all group"
                        >
                            <MdPersonAdd size={16} className="group-hover:scale-110 transition-transform" />
                            Add Patient
                        </Button> */}
                        <Button
                            onClick={() => navigate('/appointments')}

                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover: border hover:border-gray-300 transition-all text-black"
                        >
                            <MdListAlt size={16} />
                            All Appts
                        </Button>
                    </div>
                </div>
            </div>

            {/* 2. STATS CARDS */}
            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 hover:border-l-4 ${stat.color} flex items-center gap-4`}>
                        <div className="bg-slate-50 p-3 rounded-xl">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. ALERT BANNER */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 flex items-center gap-4 text-yellow-800 font-bold shadow-sm">
                <span className="text-xl">⚠️</span>
                <p className="text-sm">3 appointments need your attention (Pending or Cancelled)</p>
            </div>

            {/* 4. TODAY'S UPCOMING */}
            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Today's Upcoming Appointments</h2>
                <div className="grid grid-cols-3 gap-6">
                    {appointments.slice(0, 3).map((appt) => (
                        <div key={appt.id} className="bg-white rounded-lg p-8 border border-slate-200 flex flex-col gap-5 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{appt.patientName}</p>
                                    <p className="text-xs text-gray-400 font-bold">ID: #{appt.patientId}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest mt-2 italic">{appt.scheduledTime}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusStyles(appt.status).split(' ').slice(0, 2).join(' ')}`}>
                                    {appt.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Reason for Visit</p>
                                <p className="text-sm font-bold text-slate-600 italic">"{appt.reasonForVisit}"</p>
                            </div>
                            <div className="mt-[-8px]">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Doctor</p>
                                <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                    <span className="text-sm">🩺</span> {appt.doctorType}
                                </p>
                            </div>
                            <Button
                                onClick={() => handleView(appt)}
                                fullWidth
                                variant='outline'
                                className="mt-2 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 rounded-lg shadow-blue-100 transition-all border border-gray-300 hover:bg-slate-900 hover:text-white"
                            >
                                View Details
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. RECENT APPOINTMENTS TABLE */}
            <section className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Appointments</h2>
                    <Link to="/appointments" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors px-4 py-2 hover:bg-blue-50 rounded-xl">
                        View All
                    </Link>
                </div>
                <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
                            <tr>
                                <th className="px-8 py-6">Patient Name</th>
                                <th className="px-8 py-6">Scheduled Time</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6">Doctor</th>
                                <th className="px-8 py-6">Reason For Visit</th>
                                <th className="px-8 py-6 text-right pr-12">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {appointments.map((appt) => (
                                <tr key={appt.id} className="hover:bg-slate-50/30 transition-all duration-200 group border-l-4">
                                    <td className={`px-8 py-6 group-hover:text-blue-600 transition-colors ${getStatusStyles(appt.status).split(' ').pop()?.replace('border', 'border-l')}`}>
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{appt.patientName}</p>
                                            <p className="text-xs text-gray-400">ID: #{appt.patientId}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-slate-500 font-bold whitespace-nowrap">{appt.scheduledTime}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] ${getStatusStyles(appt.status).split(' ').slice(0, 2).join(' ')}`}>
                                            {appt.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-slate-600 text-sm font-medium">
                                        {appt.doctorType}
                                    </td>
                                    <td className="px-8 py-6 text-slate-400 font-bold italic group-hover:text-slate-600 max-w-xs truncate">
                                        {appt.reasonForVisit}
                                    </td>
                                    <td className="px-8 py-6 text-right pr-8">
                                        <div className="flex justify-end items-center gap-3">
                                            <Button
                                                onClick={() => handleDeleteClick(appt.id, appt.patientName)}
                                                className="h-10 w-10 p-0 flex items-center justify-center rounded-xl bg-red-100 hover:bg-red-500 hover:text-white transition-all border-none shadow-sm shadow-red-100/10"
                                            >
                                                <MdDeleteOutline size={20} />
                                            </Button>
                                            <Button
                                                onClick={() => handleView(appt)}
                                                variant="outline"
                                                className="px-6 py-2.5 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                            >
                                                View
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>


            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                title="Delete Appointment"
                message={`Are you sure you want to remove ${deleteModal.patientName}'s appointment?`}
                confirmLabel="Yes, Delete"
                cancelLabel="No"
                onConfirm={confirmDelete}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
            />

            <NewAppointmentModal
                isOpen={showAppointmentModal}
                onClose={() => setShowAppointmentModal(false)}
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
