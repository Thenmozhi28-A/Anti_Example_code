import AuthLayout from '../components/layout/AuthLayout'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'

const ForgotPasswordSuccess = () => {
    const navigate = useNavigate()

    return (
        <AuthLayout>
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-green-100 text-green-600">
                    <FiCheckCircle size={48} />
                </div>

                <h1 className="text-3xl font-bold text-gray-900">Success!</h1>
                <p className="mt-4 text-gray-500 mb-8">
                    Your password has been successfully changed.
                </p>

                <Button
                    fullWidth
                    onClick={() => navigate('/login')}
                >
                    Go to Login
                </Button>
            </div>
        </AuthLayout>
    )
}

export default ForgotPasswordSuccess
