import { useNavigate, useLocation, useParams } from 'react-router-dom'
import {
    MdSchedule,
    MdCalendarToday,
    MdAssignment,
    MdDescription,
    MdEditNote,
    MdArrowBack
} from 'react-icons/md'
import Button from '../components/ui/Button'
import type { Appointment } from '../types/TypesForAll'

export default function AppointmentDetails() {
    const navigate = useNavigate()
    const location = useLocation()
    useParams<{ id: string }>()

    const { appointment } = (location.state as { appointment: Appointment }) || {}

    if (!appointment) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <p className="text-slate-500 font-medium">Appointment not found</p>
                <Button onClick={() => navigate('/appointments')}>Back to Appointments</Button>
            </div>
        )
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Confirmed': return { badge: 'bg-blue-100 text-blue-700', border: 'border-l-4 border-blue-500', dot: 'bg-blue-500' }
            case 'Pending': return { badge: 'bg-yellow-100 text-yellow-700', border: 'border-l-4 border-yellow-500', dot: 'bg-yellow-500' }
            case 'Cancelled': return { badge: 'bg-red-100 text-red-700', border: 'border-l-4 border-red-500', dot: 'bg-red-500' }
            case 'Completed': return { badge: 'bg-green-100 text-green-700', border: 'border-l-4 border-green-500', dot: 'bg-green-500' }
            default: return { badge: 'bg-slate-100 text-slate-700', border: 'border-l-4 border-slate-500', dot: 'bg-slate-500' }
        }
    }

    const styles = getStatusStyles(appointment.status)
    const initials = appointment.patientName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-3xl mx-auto px-6 py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Top Bar */}
                <div className="flex items-center gap-6">
                    <Button variant="back" onClick={() => navigate(-1)}>
                        <MdArrowBack size={18} />
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-900">Appointment Details</h1>
                </div>

                {/* Hero Card */}
                <div className={`bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center gap-6 ${styles.border}`}>
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-xl font-bold flex items-center justify-center shrink-0">
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{appointment.patientName}</h2>
                            <p className="text-sm text-slate-400 font-medium">ID: #{appointment.patientId}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${styles.badge}`}>
                            {appointment.status}
                        </span>
                        <div className="flex items-center gap-2 text-slate-700 font-bold text-lg">
                            <MdSchedule className="text-slate-400" size={20} />
                            {appointment.scheduledTime}
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Appointment Info */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                        <div className="flex items-center gap-2">
                            <MdSchedule className="text-slate-400" size={18} />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Appointment Info</span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Time</p>
                                <p className="text-xl font-bold text-slate-900">{appointment.scheduledTime}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                                <MdCalendarToday className="text-blue-500" size={20} />
                                <span className="text-sm font-bold text-slate-700">Today, 26 Feb 2026</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${styles.dot}`}></div>
                                <span className="text-sm font-bold text-slate-700">{appointment.status}</span>
                            </div>
                        </div>
                    </div>

                    {/* Visit Summary */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                        <div className="flex items-center gap-2">
                            <MdAssignment className="text-slate-400" size={18} />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Reason for Visit</span>
                        </div>
                        <div>
                            <p className="text-slate-700 text-base font-medium italic leading-relaxed">
                                "{appointment.reasonForVisit}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Doctor Notes */}
                <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                    <div className="flex items-center gap-2">
                        <MdDescription className="text-slate-400" size={18} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Doctor Notes / Diagnosis</span>
                    </div>
                    {appointment.doctorNotes ? (
                        <p className="text-slate-700 text-base font-medium leading-relaxed">
                            {appointment.doctorNotes}
                        </p>
                    ) : (
                        <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                <MdEditNote className="text-slate-200" size={32} />
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold">No notes added yet</p>
                                <p className="text-slate-400 text-sm italic font-medium">Notes will appear here after consultation</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <Button
                    onClick={() => navigate(`/appointments/${appointment.id}/manage`)}
                    className="w-full bg-slate-900 text-white rounded-2xl py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all border-none shadow-xl shadow-slate-100 flex items-center justify-center gap-2"
                >
                    Manage Appointment
                    <span>→</span>
                </Button>
            </div>
        </div>
    )
}
