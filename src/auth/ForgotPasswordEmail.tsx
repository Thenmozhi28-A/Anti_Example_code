import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { forgotEmailSchema } from '../validation/schema'
import type { ForgotEmailFormData } from '../types/TypesForAll'
import UnifiedInput from '../components/ui/FormInput'
import Button from '../components/ui/Button'
import AuthLayout from '../components/layout/AuthLayout'

const ForgotPasswordEmail = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotEmailFormData>({
        resolver: yupResolver(forgotEmailSchema),
        defaultValues: { email: '' },
        mode: "onChange",
    })

    const onSubmit = (data: ForgotEmailFormData) => {
        console.log('Forgot password email:', data)
        toast.success('OTP sent to your email')
        navigate('/forgot-password/otp')
    }

    return (
        <AuthLayout>
            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
            <p className="mt-1 text-sm text-gray-500">
                Enter your email address and we'll send you an OTP to reset your password.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-7" noValidate>
                <UnifiedInput
                    label="Email"
                    type="email"
                    placeholder="admin@cityhospital.com"
                    registration={register('email')}
                    error={errors.email?.message}
                />

                <div className="space-y-5">
                    <Button type="submit" fullWidth loading={isSubmitting} className="mt-5">
                        Send OTP
                    </Button>

                    <Link
                        to="/login"
                        className="block w-full text-center text-sm font-medium text-gray-500 hover:text-gray-800"
                    >
                        ← Back to login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default ForgotPasswordEmail
