import type { AuthLayoutProps } from '../../types/TypesForAll'

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="grid h-screen grid-cols-12 bg-white">
            {/* ── Left Panel (Dynamic Form) ──────────────── col-span-6 ── */}
            <div className="col-span-12 flex flex-col justify-center px-8 sm:px-16 lg:col-span-6 lg:px-32 xl:px-48">
                {/* Logo */}
                <div className="mb-10 flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5.5 w-5.5 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-6 13h-2v-4H7v-2h4V6h2v4h4v2h-4v4z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold leading-tight tracking-tight text-slate-900">
                            HealthCare
                        </span>
                        <span className="text-[11px] font-medium leading-tight text-slate-400 uppercase tracking-wider">
                            City Hospital
                        </span>
                    </div>
                </div>

                <div className="w-full max-w-sm">
                    {children}
                </div>
            </div>

            {/* ── Right Panel (Static Content) ───────────── col-span-6 ── */}
            <div className="login-panel-bg relative hidden items-center justify-center overflow-hidden lg:col-span-6 lg:flex">
                {/* Dot grid */}
                <div className="login-dot-grid absolute inset-0" />

                {/* Decorative border circles - Softer opacity */}
                <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full border border-white/[0.03]" />
                <div className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full border border-white/[0.03]" />

                {/* Refined Content Card */}
                <div className="animate-fade-in-up relative z-10  px-10 text-center">
                    <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/70">
                            Professional Healthcare System
                        </span>
                    </div>

                    <h2 className="text-4xl font-semibold tracking-tight text-white">
                        Excellence in <span className="text-gold">Care</span>
                    </h2>

                    <p className="mt-5 text-balance text-[15px] leading-relaxed text-slate-300/90">
                        Providing a secure, professional platform designed to manage patient care
                        and <br />clinic operations with efficiency and trust.
                    </p>

                    {/* Minimalist Feature Rows */}
                    <div className="mt-12 grid gap-6 text-left">
                        {[
                            { title: 'Seamless Records', desc: 'Securely manage and access patient histories.' },
                            { title: 'Workflow Optimization', desc: 'Streamline clinical tasks and daily schedules.' },
                            { title: 'Protected Data', desc: 'Bank-grade security for sensitive medical information.' },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="group flex items-start gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.03] p-5 transition-colors duration-300 hover:bg-white/[0.05]"
                            >
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs text-gold">
                                    0{idx + 1}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-white/90">{feature.title}</h3>
                                    <p className="text-xs leading-normal text-slate-400">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default AuthLayout
