import type { InputHTMLAttributes, ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

// ─── Auth ─────────────────────────────────────────────────────────────────────
export type { LoginFormData, ForgotEmailFormData, ForgotOTPFormData, ForgotResetFormData, RegisterFormData } from '../validation/schema'

export interface User {
    id: string
    email: string
    fullName: string
    password?: string
}

// ─── Appointments ─────────────────────────────────────────────────────────────
export interface Appointment {
    id: string
    patientId: string
    patientName: string
    scheduledTime: string
    status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed'
    reasonForVisit: string
    doctorNotes: string
    doctorType: string
}

export interface Patient {
    id: string
    patientId: string
    patientName: string
    age: number
    gender: 'Male' | 'Female' | 'Other'
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
    phone: string
    lastVisit: string
    status: 'Active' | 'Inactive'
}

export interface MedicalRecord {
    id: string
    patientId: string
    patientName: string
    date: string
    recordType: 'Lab Report' | 'Prescription' | 'Diagnosis' | 'Surgery' | 'Scan/X-Ray'
    diagnosis: string
    doctorType: string
    status: 'Active' | 'Completed' | 'Critical'
    notes?: string
}

export interface Prescription {
    id: string
    patientId: string
    patientName: string
    medicineName: string
    dosage: string
    frequency: 'Once daily' | 'Twice daily' | 'Three times daily' | 'Four times daily' | 'As needed' | 'Every 8 hours' | 'Every 12 hours'
    startDate: string
    endDate: string
    doctorType: string
    status: 'Active' | 'Completed' | 'Expired'
    notes?: string
}

// ─── Layout & Components ───────────────────────────────────────────────────────
export interface AuthLayoutProps {
    children: ReactNode
}

export interface ProtectedRouteProps {
    children: ReactNode
}

export interface ConfirmationModalProps {
    isOpen: boolean
    title: string
    message: string
    confirmLabel: string
    cancelLabel?: string
    variant?: 'danger' | 'primary'
    onConfirm: () => void
    onClose: () => void
}

export interface NewAppointmentModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (appointment: Appointment) => void
}

export interface AppointmentDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    appointment: Appointment | null
    onSave: (updated: Appointment) => void
}

export interface PatientProfileModalProps {
    isOpen: boolean
    onClose: () => void
    patient: Patient | null
    appointments: Appointment[]
    onSave: (updated: Patient) => void
}

export interface StatPillProps {
    label: string
    isActive: boolean
    onClick: () => void
}

export interface AddPatientModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (patient: Patient) => void
}

// Removed BackButtonProps, IconButtonProps, StatPillProps as requested
// ─── Input (unified — covers text, email, password) ──────────────────────────
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string
    registration?: UseFormRegisterReturn // Made optional to support local state
    error?: string
    rightLabel?: ReactNode
    type?: string
}

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'pillActive' | 'pillInactive' | 'back'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    fullWidth?: boolean
    loading?: boolean
    children?: ReactNode
}
