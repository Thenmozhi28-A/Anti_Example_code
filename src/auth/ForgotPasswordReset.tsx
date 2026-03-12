import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { forgotResetSchema } from '../validation/schema'
import type { ForgotResetFormData } from '../types/TypesForAll'
import UnifiedInput from '../components/ui/FormInput'
import Button from '../components/ui/Button'
import AuthLayout from '../components/layout/AuthLayout'

const ForgotPasswordReset = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotResetFormData>({
        resolver: yupResolver(forgotResetSchema),
        defaultValues: { password: '', confirmPassword: '' },
        mode: "onChange",
    })

    const onSubmit = (data: ForgotResetFormData) => {
        console.log('Forgot password reset:', data)
        toast.success('Password reset successfully')
        navigate('/forgot-password/success')
    }

    return (
        <AuthLayout>
            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900">Set New Password</h1>
            <p className="mt-1 text-sm text-gray-500">
                Please enter your new password below.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-7" noValidate>
                <UnifiedInput
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    registration={register('password')}
                    error={errors.password?.message}
                />

                <UnifiedInput
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    registration={register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                />

                <div className="space-y-4">
                    <Button type="submit" fullWidth loading={isSubmitting} className="mt-5">
                        Reset Password
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

export default ForgotPasswordReset
