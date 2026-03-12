import { NavLink } from 'react-router-dom'
import {
    FiGrid,
    FiCalendar,
    FiUsers,
    FiFileText,
    FiClipboard,
    FiUser,
    FiLogOut
} from 'react-icons/fi'
import Button from '../components/ui/Button'

interface SidebarProps {
    onLogoutClick: () => void
}

const Sidebar = ({ onLogoutClick }: SidebarProps) => {
    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <FiGrid size={20} /> },
        { label: 'Appointments', path: '/appointments', icon: <FiCalendar size={20} /> },
        { label: 'Patients', path: '/patients', icon: <FiUsers size={20} /> },
        { label: 'Medical Records', path: '/records', icon: <FiFileText size={20} /> },
        { label: 'Prescriptions', path: '/prescriptions', icon: <FiClipboard size={20} /> },
        { label: 'Profile', path: '/profile', icon: <FiUser size={20} /> },
    ]

    return (
        <aside className="h-full flex flex-col bg-slate-900 text-white shadow-xl overflow-y-auto no-scrollbar border-r border-slate-800">
            {/* Logo Section */}
            <div className="flex h-20 items-center justify-center px-6 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-black tracking-tighter uppercase italic">System Admin</span>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 mt-8 space-y-2 px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) => [
                            'flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300 group',
                            isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 translate-x-1'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        ].join(' ')}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={[
                                    'shrink-0 transition-colors duration-300',
                                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'
                                ].join(' ')}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section with Logout */}
            <div className="p-4 border-t border-slate-800/50">
                <Button
                    variant="primary"
                    fullWidth
                    onClick={onLogoutClick}
                    className="border-transparent text-slate-400 hover:bg-red-500/10 hover:text-red-400 py-4 px-4 justify-start"
                >
                    <FiLogOut size={20} className="shrink-0" />
                    <span>Logout</span>
                </Button>
            </div>
        </aside>
    )
}

export default Sidebar
