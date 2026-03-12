import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema } from '../validation/schema'

import type { RegisterFormData } from '../types/TypesForAll.ts'
import UnifiedInput from '../components/ui/FormInput'
import Button from '../components/ui/Button'
import AuthLayout from '../components/layout/AuthLayout'
import { authService } from '../services/authService.ts'

const Register = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: { fullName: '', email: '', password: '' },
        mode: "onChange",
    })

    const onSubmit = (data: RegisterFormData) => {
        const result = authService.register(data.fullName, data.email, data.password)

        if (result.success) {
            toast.success('Account created successfully')
            navigate('/login')
        } else {
            toast.error(result.message || 'Failed to create account')
        }
    }

    return (
        <AuthLayout>
            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
            <p className="mt-1 text-sm text-gray-500">Join our healthcare management system</p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-7" noValidate>
                <UnifiedInput
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    registration={register('fullName')}
                    error={errors.fullName?.message}
                />

                <UnifiedInput
                    label="Email"
                    type="email"
                    placeholder="john@cityhospital.com"
                    registration={register('email')}
                    error={errors.email?.message}
                />

                <UnifiedInput
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    registration={register('password')}
                    error={errors.password?.message}
                />

                <div className="space-y-4">
                    <Button type="submit" fullWidth loading={isSubmitting} className="mt-5">
                        Create Account
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-semibold text-gray-900 hover:text-gray-700 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    )
}

export default Register
