import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import { authService } from '../services/authService'
import { UserProvider } from '../context/UserContext'

const AppLayout = () => {
    const navigate = useNavigate()
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const handleLogoutConfirm = () => {
        authService.logout()
        setShowLogoutModal(false)
        navigate('/register')
    }

    return (
        <UserProvider>
            <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
                {/* 1. Sidebar - Fixed width based on 2/12 columns (~16.6vw) */}
                <div className="w-[15%] h-full shrink-0">
                    <Sidebar onLogoutClick={() => setShowLogoutModal(true)} />
                </div>

                {/* 2. Main Content Wrapper - Remaining 10/12 columns */}
                <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden relative">
                    {/* Fixed Header */}
                    <Header />

                    {/* Scrollable Content Area */}
                    <main className="flex-1 overflow-y-auto no-scrollbar bg-[#F8FAFC]">
                        <div className="p-10 pb-20">
                            <div className="px-4">
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
