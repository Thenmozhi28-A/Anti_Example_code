import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { forgotOTPSchema } from '../validation/schema'
import type { ForgotOTPFormData } from '../types/TypesForAll'
import Button from '../components/ui/Button'
import AuthLayout from '../components/layout/AuthLayout'

const ForgotPasswordOTP = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [timer, setTimer] = useState(30)
    const [canResend, setCanResend] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        trigger,
    } = useForm<ForgotOTPFormData>({
        resolver: yupResolver(forgotOTPSchema),
        defaultValues: { otp: '' },
        mode: "onChange",
    })

    useEffect(() => {
        let interval: any
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        } else {
            setCanResend(true)
        }
        return () => clearInterval(interval)
    }, [timer])

    const handleInputChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        const combinedOtp = newOtp.join('')
        setValue('otp', combinedOtp)
        trigger('otp')

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const onSubmit = (data: ForgotOTPFormData) => {
        console.log('Forgot password OTP:', data)
        toast.success('OTP verified successfully')
        navigate('/forgot-password/reset')
    }

    const handleResend = () => {
        if (!canResend) return
        setTimer(30)
        setCanResend(false)
        toast.success('A new OTP has been sent to your email')
    }

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold text-gray-900">Enter OTP</h1>
            <p className="mt-1 text-sm text-gray-500">
                Please enter the 6-digit code sent to your email address.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8" noValidate>
                <div>
                    <div className="flex justify-between gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el }}
                                type="text"
                                inputMode="numeric"
                                value={digit}
                                aria-label={`Digit ${index + 1}`}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                                maxLength={1}
                            />
                        ))}
                    </div>
                    {errors.otp && (
                        <p className="mt-2 text-xs font-semibold text-red-500">{errors.otp.message}</p>
                    )}
                </div>

                <div className="space-y-6">
                    <Button type="submit" fullWidth loading={isSubmitting} className="mt-5">
                        Verify OTP
                    </Button>

                    <div className="flex flex-col items-center gap-5">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={!canResend}
                            className={`text-sm font-medium ${canResend ? 'text-blue-600 hover:underline cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                        >
                            {canResend ? "Didn't receive the code? Resend" : `Resend OTP in ${timer}s`}
                        </button>
                        <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-800">
                            ← Back to login
                        </Link>
                    </div>
                </div>
            </form>
        </AuthLayout>
    )
}

export default ForgotPasswordOTP
