import { useState, useRef } from 'react'
import { useUser } from '../context/UserContext'
import { MdEdit, MdSave, MdClose, MdCameraAlt } from 'react-icons/md'
import toast from 'react-hot-toast'

export default function Profile() {
    const { fullName, email, profileImage, updateUser, updateProfileImage } = useUser()

    // Edit mode state
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState(fullName)
    const [editEmail, setEditEmail] = useState(email)
    const [editLocation, setEditLocation] = useState('Chennai, Tamil Nadu')
    const [editImage, setEditImage] = useState<string | null>(profileImage)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [location, setLocation] = useState('Chennai, Tamil Nadu')

    const initials = (fullName?.[0] || 'D').toUpperCase()

    const stats = [
        { value: '1,284', label: 'Total Patients', bg: 'bg-blue-50', color: 'text-blue-600' },
        { value: '18', label: "Today's Appointments", bg: 'bg-green-50', color: 'text-green-600' },
        { value: '156', label: 'Prescriptions Written', bg: 'bg-purple-50', color: 'text-purple-600' },
        { value: '8', label: 'Years at Hospital', bg: 'bg-orange-50', color: 'text-orange-600' },
    ]

    const workingHours = [
        { day: 'Monday - Friday', time: '09:00 AM - 06:00 PM', bg: 'bg-green-100', color: 'text-green-700' },
        { day: 'Saturday', time: '09:00 AM - 02:00 PM', bg: 'bg-yellow-100', color: 'text-yellow-700' },
        { day: 'Sunday', time: 'Off', bg: 'bg-red-100', color: 'text-red-600' },
    ]

    const handleEditClick = () => {
        setEditName(fullName)
        setEditEmail(email)
        setEditLocation(location)
        setEditImage(profileImage)
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const handleSave = () => {
        if (!editName.trim() || !editEmail.trim()) {
            toast.error('Name and Email are required')
            return
        }
        updateUser(editName.trim(), editEmail.trim())
        updateProfileImage(editImage)
        setLocation(editLocation)
        setIsEditing(false)
        toast.success('Profile updated ✓')
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image must be less than 2MB')
            return
        }
        const reader = new FileReader()
        reader.onloadend = () => {
            setEditImage(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const infoItems = [
        { icon: '📧', label: 'Email', value: email },
        { icon: '📍', label: 'Location', value: location },
    ]

    return (
        <div className="bg-gray-50 min-h-screen p-6 fixed">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm p-6 text-center relative overflow-hidden">

                        {/* Transition wrapper */}
                        <div className={`transition-all duration-500 ease-in-out ${isEditing ? 'opacity-0 scale-95 absolute inset-0 pointer-events-none' : 'opacity-100 scale-100'}`}>
                            {/* VIEW MODE */}
                            {/* Avatar */}
                            <div className="relative mx-auto w-24 h-24">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg" />
                                ) : (
                                    <div className="w-24 h-24 rounded-full mx-auto bg-gray-900 text-white text-3xl font-bold flex items-center justify-center shadow-lg">
                                        {initials}
                                    </div>
                                )}
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mt-4">{fullName}</h2>
                            <p className="text-sm text-gray-500 mt-1">System Admin</p>
                            <span className="inline-block bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-xs font-medium mt-3">
                                🏥 City Hospital
                            </span>

                            <div className="border-t border-gray-100 mt-6" />

                            <div className="space-y-4 mt-6 text-left">
                                {infoItems.map((item) => (
                                    <div key={item.label} className="flex items-center gap-3">
                                        <span className="text-lg">{item.icon}</span>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                                            <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 mt-6" />

                            <button
                                onClick={handleEditClick}
                                className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-700 transition-all mt-6 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <MdEdit size={18} />
                                Edit Profile
                            </button>
                        </div>

                        {/* EDIT MODE */}
                        <div className={`transition-all duration-500 ease-in-out ${isEditing ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
                            <div className="p-2">
                                {/* Avatar Upload */}
                                <div className="relative mx-auto w-24 h-24 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                    {editImage ? (
                                        <img src={editImage} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg" />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full mx-auto bg-gray-900 text-white text-3xl font-bold flex items-center justify-center shadow-lg">
                                            {(editName?.[0] || 'D').toUpperCase()}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <MdCameraAlt size={28} className="text-white" />
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">Click avatar to change</p>

                                <div className="space-y-4 mt-6 text-left">
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Name</label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={e => setEditName(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email</label>
                                        <input
                                            type="email"
                                            value={editEmail}
                                            onChange={e => setEditEmail(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Location</label>
                                        <input
                                            type="text"
                                            value={editLocation}
                                            onChange={e => setEditLocation(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                            placeholder="City, State"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 bg-gray-100 text-gray-700 rounded-xl py-3 text-sm font-semibold hover:bg-gray-200 transition-all cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <MdClose size={18} />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                                    >
                                        <MdSave size={18} />
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className={`${stat.bg} rounded-2xl p-5`}>
                                <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* About */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">About</h3>
                        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                            Experienced medical professional with over 12 years in General Medicine.
                            Specialized in preventive care, chronic disease management, and patient wellness.
                        </p>
                    </div>

                    {/* Working Hours */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Working Hours</h3>
                        <div className="space-y-3 mt-4">
                            {workingHours.map((item) => (
                                <div key={item.day} className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-gray-700">{item.day}</p>
                                    <span className={`${item.bg} ${item.color} rounded-lg px-3 py-1.5 text-xs font-bold`}>
                                        {item.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
