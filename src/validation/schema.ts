import * as yup from 'yup'

export const loginSchema = yup.object({
    email: yup.string()
        .email('Enter a valid email')
        .required('Email is required'),


    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
})

// ─── Forgot Password (Multi-step) ──────────────────────────────────────────
export const forgotEmailSchema = yup.object({
    email: yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
})

export const forgotOTPSchema = yup.object({
    otp: yup.string()
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
        .required('OTP is required'),
})

export const forgotResetSchema = yup.object({
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),

    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], "Passwords must match")
        .required('Confirm your password'),
})

// ─── Register ─────────────────────────────────────────────────────────────
export const registerSchema = yup.object({
    fullName: yup.string()
        .min(2, 'Name is too short')
        .required('Full name is required'),
    email: yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^[A-Za-z\d!@#$%^&*]+$/, "Password must contain letters, numbers, and special characters")
        .required('Password is required'),
})

export type LoginFormData = yup.InferType<typeof loginSchema>
export type ForgotEmailFormData = yup.InferType<typeof forgotEmailSchema>
export type ForgotOTPFormData = yup.InferType<typeof forgotOTPSchema>
export type ForgotResetFormData = yup.InferType<typeof forgotResetSchema>
export type RegisterFormData = yup.InferType<typeof registerSchema>
