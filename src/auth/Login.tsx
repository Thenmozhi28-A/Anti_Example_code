import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import { loginSchema } from '../validation/schema'
import type { LoginFormData } from '../types/TypesForAll'
import UnifiedInput from '../components/ui/FormInput'
import Button from '../components/ui/Button'
import AuthLayout from '../components/layout/AuthLayout'
import { authService } from '../services/authService.ts'

const Login = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: { email: '', password: '' },
        mode: "onChange",
    })

    const onSubmit = (data: LoginFormData) => {
        const result = authService.login(data.email, data.password)

        if (result.success) {
            toast.success('Successfully logged in')
            navigate('/dashboard')
        } else {
            toast.error(result.message || 'Invalid email or password')
        }
    }

    return (
        <AuthLayout>
            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Hospital login</p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-7" noValidate>
                <UnifiedInput
                    label="Email"
                    type="email"
                    placeholder="admin@cityhospital.com"
                    registration={register('email')}
                    error={errors.email?.message}
                />

                <UnifiedInput
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    registration={register('password')}
                    error={errors.password?.message}
                    rightLabel={
                        <Link
                            to="/forgot-password/email"
                            className="text-xs text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    }
                />

                <Button type="submit" fullWidth loading={isSubmitting} className="mt-5">
                    Sign In
                </Button>



                <p className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="font-semibold text-gray-900 hover:text-gray-700 hover:underline"
                    >
                        Create account
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )
}

export default Login
