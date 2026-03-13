import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import { authService } from '../services/authService'
import { UserProvider } from '../context/UserContext'

const AppLayout = () => {
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const handleLogoutConfirm = () => {
        authService.logout()
        setShowLogoutModal(false)
        navigate('/register')
    }

    return (
        <UserProvider>
            <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
                {/* 1. Sidebar - Fixed width on large screens, Drawer on mobile */}
                <div
                    className={`fixed inset-0 z-50 transition-all duration-300 lg:static lg:block lg:w-[20%] xl:w-[15%] h-full shrink-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                        }`}
                >
                    <Sidebar
                        onLogoutClick={() => setShowLogoutModal(true)}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                </div>

                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* 2. Main Content Wrapper */}
                <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden relative">
                    {/* Fixed Header */}
                    <Header onMenuClick={() => setIsSidebarOpen(true)} />

                    {/* Scrollable Content Area */}
                    <main className="flex-1 overflow-y-auto no-scrollbar bg-[#F8FAFC]">
                        <div className="p-4 md:p-10 pb-20">
                            <div className="max-w-9xl mx-auto">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>

                <ConfirmationModal
                    isOpen={showLogoutModal}
                    title="Logout"
                    message="Do you want to logout your profile?"
                    confirmLabel="Yes, Logout"
                    cancelLabel="No"
                    onConfirm={handleLogoutConfirm}
                    onClose={() => setShowLogoutModal(false)}
                />
            </div>
        </UserProvider>
    )
}

export default AppLayout
