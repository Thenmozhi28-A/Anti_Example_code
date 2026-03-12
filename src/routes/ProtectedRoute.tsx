import { Navigate, useLocation } from 'react-router-dom'
import { authService } from '../services/authService.ts'
import type { ProtectedRouteProps } from '../types/TypesForAll.ts'

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation()
    const isAuthenticated = authService.isAuthenticated()

    if (!isAuthenticated) {
        // Redirect to login but save the current location to return after login
        return <Navigate to="/register" state={{ from: location }} replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
