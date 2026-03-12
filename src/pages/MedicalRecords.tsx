import { useState } from 'react'
import {
    MdAdd,
    MdSearch,
    MdDeleteOutline,
    MdFolderOpen,
    MdEdit,
    MdVisibility,
    MdRefresh,
    MdAssignment,
    MdCheckCircle,
    MdWarning,
    MdCalendarToday,
    MdPerson
} from 'react-icons/md'
import Button from '../components/ui/Button'
import {
    useGetRecordsQuery,
    useDeleteRecordMutation
} from '../store/api/medicalRecordsApi'
import AddMedicalRecordModal from '../components/AddMedicalRecordModal'
import EditMedicalRecordModal from '../components/EditMedicalRecordModal'
import ViewRecordModal from '../components/ViewRecordModal'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import toast from 'react-hot-toast'
import type { MedicalRecord } from '../types/TypesForAll'

export default function MedicalRecords() {
    // API Hooks
    const { data: records = [], isLoading, isError, refetch } = useGetRecordsQuery()
    const [deleteRecord] = useDeleteRecordMutation()

    // Local State
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'All' | MedicalRecord['status']>('All')
    const [typeFilter, setTypeFilter] = useState<'All' | MedicalRecord['recordType']>('All')

    // Modal State
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; record: MedicalRecord | null }>({
        isOpen: false,
        record: null
    })

    // Stats
    const stats = [
        { label: 'Total Records', count: records.length, icon: <MdAssignment size={20} className="text-slate-400" />, color: 'border-slate-400' },
        { label: 'Active', count: records.filter(r => r.status === 'Active').length, icon: <MdRefresh size={20} className="text-blue-500" />, color: 'border-blue-500' },
        { label: 'Completed', count: records.filter(r => r.status === 'Completed').length, icon: <MdCheckCircle size={20} className="text-emerald-500" />, color: 'border-emerald-500' },
        { label: 'Critical', count: records.filter(r => r.status === 'Critical').length, icon: <MdWarning size={20} className="text-rose-500" />, color: 'border-rose-500' },
    ]

    // Filtered Records
    const filteredRecords = records.filter(record => {
        const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.patientId.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'All' || record.status === statusFilter
        const matchesType = typeFilter === 'All' || record.recordType === typeFilter
        return matchesSearch && matchesStatus && matchesType
    })

    const handleDelete = async () => {
        if (deleteModal.record) {
            try {
                await deleteRecord(deleteModal.record.id).unwrap()
                toast.success('Record deleted ✓')
                setDeleteModal({ isOpen: false, record: null })
            } catch (err) {
                toast.error('Failed to delete record ✗')
            }
        }
    }

    const getStatusBadgeStyles = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-blue-100 text-blue-700'
            case 'Completed': return 'bg-emerald-100 text-emerald-700'
            case 'Critical': return 'bg-rose-100 text-rose-700'
            default: return 'bg-slate-100 text-slate-700'
        }
    }

    const getTypeBadgeStyles = (type: string) => {
        switch (type) {
            case 'Lab Report': return 'bg-blue-100 text-blue-700'
            case 'Prescription': return 'bg-purple-100 text-purple-700'
            case 'Diagnosis': return 'bg-orange-100 text-orange-700'
            case 'Surgery': return 'bg-red-100 text-red-700'
            case 'Scan/X-Ray': return 'bg-teal-100 text-teal-700'
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
                <h3 className="text-lg font-black text-red-900 uppercase tracking-tight">Failed to load records</h3>
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Medical Records</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">Access clinical documents and history</p>
                </div>
                <Button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 border-none"
                >
                    <MdAdd size={20} />
                    Add Record
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
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Search Patient</label>
                        <div className="relative group">
                            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-transparent rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Record Type</label>
                        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            {['All', 'Lab Report', 'Prescription', 'Diagnosis', 'Surgery', 'Scan/X-Ray'].map((pill) => (
                                <Button
                                    key={pill}
                                    variant={typeFilter === pill ? 'pillActive' : 'pillInactive'}
                                    onClick={() => setTypeFilter(pill as any)}
                                >
                                    {pill}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status</label>
                        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            {['All', 'Active', 'Completed', 'Critical'].map((pill) => (
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
            {filteredRecords.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-5">Patient</th>
                                    <th className="px-6 py-5">Date</th>
                                    <th className="px-6 py-5">Type</th>
                                    <th className="px-6 py-5">Diagnosis</th>
                                    <th className="px-6 py-5">Doctor</th>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-6 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    {record.patientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 leading-tight">{record.patientName}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: #{record.patientId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                                <MdCalendarToday size={16} className="text-slate-300" />
                                                {record.date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getTypeBadgeStyles(record.recordType)}`}>
                                                {record.recordType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-slate-500 font-medium italic truncate max-w-xs leading-relaxed">
                                                "{record.diagnosis}"
                                            </p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                                <MdPerson size={16} className="text-slate-300" />
                                                {record.doctorType}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadgeStyles(record.status)}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    onClick={() => { setSelectedRecord(record); setShowViewModal(true); }}
                                                    variant="ghost"
                                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                                                >
                                                    <MdVisibility size={18} />
                                                </Button>
                                                <Button
                                                    onClick={() => { setSelectedRecord(record); setShowEditModal(true); }}
                                                    variant="ghost"
                                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                                                >
                                                    <MdEdit size={18} />
                                                </Button>
                                                <Button
                                                    onClick={() => setDeleteModal({ isOpen: true, record })}
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
                    <MdFolderOpen className="text-slate-200 mb-6" size={64} />
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No medical records found</h3>
                    <p className="text-slate-400 mt-2 text-sm font-bold uppercase tracking-widest max-w-xs">Try adjusting your filters or add a new clinical record to get started.</p>
                    <Button onClick={() => setShowAddModal(true)} className="mt-8 px-10 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                        + Add your first record
                    </Button>
                </div>
            )}

            {/* Modals */}
            <AddMedicalRecordModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
            <EditMedicalRecordModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                record={selectedRecord}
            />
            <ViewRecordModal
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
                record={selectedRecord}
            />
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                title="Delete Record"
                message="Are you sure you want to delete this medical record? This action cannot be undone."
                confirmLabel="Yes, Delete"
                onConfirm={handleDelete}
                onClose={() => setDeleteModal({ isOpen: false, record: null })}
                variant="danger"
            />
        </div>
    )
}
