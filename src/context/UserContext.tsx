import { createContext, useContext, useState, type ReactNode } from 'react'
import { authService } from '../services/authService'

interface UserContextType {
    fullName: string
    email: string
    profileImage: string | null
    updateUser: (fullName: string, email: string) => void
    updateProfileImage: (base64: string | null) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
    const user = authService.getCurrentUser()
    const [fullName, setFullName] = useState(user?.fullName || 'Doctor')
    const [email, setEmail] = useState(user?.email || 'N/A')
    const [profileImage, setProfileImage] = useState<string | null>(
        localStorage.getItem('profile_image')
    )

    const updateUser = (newName: string, newEmail: string) => {
        authService.updateProfile(newName, newEmail)
        setFullName(newName)
        setEmail(newEmail)
    }

    const updateProfileImage = (base64: string | null) => {
        if (base64) {
            localStorage.setItem('profile_image', base64)
        } else {
            localStorage.removeItem('profile_image')
        }
        setProfileImage(base64)
    }

    return (
        <UserContext.Provider value={{ fullName, email, profileImage, updateUser, updateProfileImage }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error('useUser must be used within UserProvider')
    return ctx
}
