import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './auth/Login'
import Register from './auth/Register'
import ForgotPasswordEmail from './auth/ForgotPasswordEmail'
import ForgotPasswordOTP from './auth/ForgotPasswordOTP'
import ForgotPasswordReset from './auth/ForgotPasswordReset'
import ForgotPasswordSuccess from './auth/ForgotPasswordSuccess'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import Patients from './pages/Patients'
import MedicalRecords from './pages/MedicalRecords'
import Prescriptions from './pages/Prescriptions'
import Profile from './pages/Profile'
import AppointmentDetails from './pages/AppointmentDetails'

import ProtectedRoute from './routes/ProtectedRoute'
import AppLayout from './layout/AppLayout'

const App = () => {
    return (
        <BrowserRouter>
            <Toaster position="top-right" />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/register" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password/email" element={<ForgotPasswordEmail />} />
                <Route path="/forgot-password/otp" element={<ForgotPasswordOTP />} />
                <Route path="/forgot-password/reset" element={<ForgotPasswordReset />} />
                <Route path="/forgot-password/success" element={<ForgotPasswordSuccess />} />

                {/* Protected Dashboard Routes */}
                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/appointments/:id" element={<AppointmentDetails />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/records" element={<MedicalRecords />} />
                    <Route path="/prescriptions" element={<Prescriptions />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
