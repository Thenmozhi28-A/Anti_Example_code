import { useUser } from '../context/UserContext'

const Header = () => {
    const { fullName, profileImage } = useUser()

    return (
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-8 backdrop-blur-md sticky top-0 z-40 w-full transition-all duration-300">
            {/* 1. Left: Logo, Title, and Subtitle */}
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-lg shadow-slate-200 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-6 13h-2v-4H7v-2h4V6h2v4h4v2h-4v4z" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">HealthCare</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mt-1">City Hospital</span>
                </div>
            </div>

            {/* 2. Right: User Info */}
            <div className="flex items-center gap-3">
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover shadow-md"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm shadow-md">
                        {fullName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                )}

                <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 leading-none">
                        {fullName || 'User'}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider leading-none">System Admin</span>
                </div>
            </div>
        </header>
    )
}

export default Header
