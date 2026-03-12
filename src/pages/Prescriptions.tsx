import { useState } from 'react'
import {
    MdAdd,
    MdSearch,
    MdDeleteOutline,
    MdEdit,
    MdVisibility,
    MdRefresh,
    MdCheckCircle,
    MdWarning,
    MdCalendarToday,
    MdPerson,
    MdMedication,
    MdTimelapse
} from 'react-icons/md'
import Button from '../components/ui/Button'
import {
    useGetPrescriptionsQuery,
    useDeletePrescriptionMutation
} from '../store/api/prescriptionsApi'
import AddPrescriptionModal from '../components/AddPrescriptionModal'
import EditPrescriptionModal from '../components/EditPrescriptionModal'
import ViewPrescriptionModal from '../components/ViewPrescriptionModal'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import toast from 'react-hot-toast'
import type { Prescription } from '../types/TypesForAll'

export default function Prescriptions() {
    // API Hooks
    const { data: prescriptions = [], isLoading, isError, refetch } = useGetPrescriptionsQuery()
    const [deletePrescription] = useDeletePrescriptionMutation()

    // Local State
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'All' | Prescription['status']>('All')

    // Modal State
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; prescription: Prescription | null }>({
        isOpen: false,
        prescription: null
    })

    // Stats
    const stats = [
        { label: 'Total', count: prescriptions.length, icon: <MdMedication size={20} className="text-slate-400" />, color: 'border-slate-400' },
        { label: 'Active', count: prescriptions.filter(p => p.status === 'Active').length, icon: <MdRefresh size={20} className="text-emerald-500" />, color: 'border-emerald-500' },
        { label: 'Completed', count: prescriptions.filter(p => p.status === 'Completed').length, icon: <MdCheckCircle size={20} className="text-blue-500" />, color: 'border-blue-500' },
        { label: 'Expired', count: prescriptions.filter(p => p.status === 'Expired').length, icon: <MdTimelapse size={20} className="text-rose-500" />, color: 'border-rose-500' },
    ]

    // Filtered Prescriptions
    const filteredPrescriptions = prescriptions.filter(prescription => {
        const matchesSearch = prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'All' || prescription.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleDelete = async () => {
        if (deleteModal.prescription) {
            try {
                await deletePrescription(deleteModal.prescription.id).unwrap()
                toast.success('Prescription deleted ✓')
                setDeleteModal({ isOpen: false, prescription: null })
            } catch (err) {
                toast.error('Failed to delete prescription ✗')
            }
        }
    }

    const getStatusBadgeStyles = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700'
            case 'Completed': return 'bg-blue-100 text-blue-700'
            case 'Expired': return 'bg-red-100 text-red-700'
            default: return 'bg-slate-100 text-slate-700'
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-10">
                <div className="flex justify-between items-center">
                    <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="h-12 w-40 bg-slate-200 rounded-xl animate-pulse" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-slate-100 animate-pulse" />)}
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 bg-white rounded-xl border border-slate-100 animate-pulse" />)}
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <MdWarning className="text-red-500 mb-4" size={48} />
                <h3 className="text-lg font-black text-red-900 uppercase tracking-tight">Failed to load prescriptions</h3>
                <p className="text-red-600 mt-2 text-sm font-bold uppercase tracking-widest">There was an issue connecting to the server.</p>
                <Button onClick={refetch} className="mt-6 px-8 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-100">
                    Retry Connection
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Prescriptions</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">Manage all patient prescriptions</p>
                </div>
                <Button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 border-none"
                >
                    <MdAdd size={20} />
                    Add Prescription
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className={`bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 hover:border-l-4 ${stat.color} flex items-center gap-4`}>
                        <div className="bg-slate-50 p-3 rounded-xl">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900">{stat.count}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                    <div className="flex-1 space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Search</label>
                        <div className="relative group">
                            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by patient or medicine..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-transparent rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status</label>
                        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            {['All', 'Active', 'Completed', 'Expired'].map((pill) => (
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
            </div>

            {/* Table */}
            {filteredPrescriptions.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-5">Patient</th>
                                    <th className="px-6 py-5">Medicine</th>
                                    <th className="px-6 py-5">Dosage</th>
                                    <th className="px-6 py-5">Frequency</th>
                                    <th className="px-6 py-5">Start Date</th>
                                    <th className="px-6 py-5">End Date</th>
                                    <th className="px-6 py-5">Doctor</th>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-6 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredPrescriptions.map((prescription) => (
                                    <tr key={prescription.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    {prescription.patientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 leading-tight">{prescription.patientName}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: #{prescription.patientId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="font-bold text-slate-900">{prescription.medicineName}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="bg-blue-50 text-blue-700 rounded-lg px-2 py-1 text-xs font-bold">
                                                {prescription.dosage}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm text-slate-500 italic">{prescription.frequency}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                                <MdCalendarToday size={16} className="text-slate-300" />
                                                {prescription.startDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                                <MdCalendarToday size={16} className="text-slate-300" />
                                                {prescription.endDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                                <MdPerson size={16} className="text-slate-300" />
                                                {prescription.doctorType}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadgeStyles(prescription.status)}`}>
                                                {prescription.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    onClick={() => { setSelectedPrescription(prescription); setShowViewModal(true); }}
                                                    variant="ghost"
                                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                                                >
                                                    <MdVisibility size={18} />
                                                </Button>
                                                <Button
                                                    onClick={() => { setSelectedPrescription(prescription); setShowEditModal(true); }}
                                                    variant="ghost"
                                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                                                >
                                                    <MdEdit size={18} />
                                                </Button>
                                                <Button
                                                    onClick={() => setDeleteModal({ isOpen: true, prescription })}
                                                    variant="ghost"
                                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                                                >
                                                    <MdDeleteOutline size={18} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-20 flex flex-col items-center justify-center text-center shadow-sm border border-slate-100">
                    <MdMedication className="text-slate-200 mb-6" size={64} />
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No prescriptions found</h3>
                    <p className="text-slate-400 mt-2 text-sm font-bold uppercase tracking-widest max-w-xs">Try adjusting your search or filters, or add a new prescription to get started.</p>
                    <Button onClick={() => setShowAddModal(true)} className="mt-8 px-10 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                        + Add your first prescription
                    </Button>
                </div>
            )}

            {/* Modals */}
            <AddPrescriptionModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
            <EditPrescriptionModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                prescription={selectedPrescription}
            />
            <ViewPrescriptionModal
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
                prescription={selectedPrescription}
            />
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                title="Delete Prescription"
                message={`Are you sure you want to delete ${deleteModal.prescription?.patientName}'s prescription? This action cannot be undone.`}
                confirmLabel="Yes, Delete"
                onConfirm={handleDelete}
                onClose={() => setDeleteModal({ isOpen: false, prescription: null })}
                variant="danger"
            />
        </div>
    )
}
