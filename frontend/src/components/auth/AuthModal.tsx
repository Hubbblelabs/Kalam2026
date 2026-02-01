'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, Mail, Lock, User, Phone, X } from 'lucide-react';
import Link from 'next/link';

export function AuthModal() {
    const { isOpen, closeAuth, view, toggleView } = useAuth();
    const [activeView, setActiveView] = useState(view);

    // Sync internal state with context view, but allow local transition
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setActiveView(view);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, view]);

    if (!isOpen) return null;

    const isLogin = activeView === 'login';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={closeAuth}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-scale-in transition-all duration-300">

                {/* Close Button */}
                <button
                    onClick={closeAuth}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-black/5 text-white md:text-neutral-dark/50 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Visual Side (Yellow Panel) */}
                {/* We swap order based on view for visual variety, or keep it consistent. 
            Let's keep the yellow panel on the Left for Login, Right for Register to match previous design logic 
            BUT in a modal, sliding the panel is cooler. For simplicity MVP, let's keep panel static or just simple swap.
            Let's keep panel on Left for consistent branding in modal.
        */}
                <div className={`w-full md:w-5/12 bg-accent relative p-10 text-neutral-dark flex flex-col justify-between overflow-hidden transition-all duration-500 ease-in-out order-first`}>
                    {/* Background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

                    <div className="relative z-10 flex items-center justify-between">
                        <div className="font-heading font-black text-2xl tracking-tighter text-neutral-dark">KALAM 2026</div>
                    </div>

                    <div className="relative z-10 space-y-6 my-auto">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl leading-[0.9] tracking-tight">
                            <span className="text-neutral-dark">{isLogin ? 'Ignite' : 'Join the'}</span> <br />
                            <span className="text-white drop-shadow-sm">{isLogin ? 'Innovation.' : 'Revolution.'}</span>
                        </h2>
                        <p className="text-neutral-dark/80 text-lg font-medium leading-relaxed max-w-xs">
                            {isLogin
                                ? 'Log in to access your innovator dashboard and manage your participation.'
                                : 'Create your account to enable event registration, team formation, and certification.'}
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto pt-8">
                        <div className="flex items-center gap-3">
                            <div className="h-1 bg-black w-12 rounded-full" />
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-dark">
                                {isLogin ? 'Official Portal' : '2000+ Registrations'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="w-full md:w-7/12 p-8 md:p-14 bg-white flex flex-col justify-center relative">
                    <div className="max-w-md mx-auto w-full space-y-8 animate-fade-in">
                        <div className="space-y-2">
                            <h3 className="font-heading text-3xl font-bold text-neutral-dark">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h3>
                            <p className="text-gray-500">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={toggleView}
                                    className="text-primary-600 font-bold hover:text-accent transition-colors underline decoration-transparent hover:decoration-accent"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>

                        {isLogin ? <LoginForm /> : <RegisterForm />}
                    </div>
                </div>

            </div>
        </div>
    );
}

function LoginForm() {
    return (
        <>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-5">
                    <div className="space-y-2 group">
                        <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-accent-700 transition-colors">Email Address</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-600 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 group">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-accent-700 transition-colors">Password</label>
                            <Link href="/forgot-password" className="text-xs text-primary-600 font-bold hover:text-accent-700 underline decoration-transparent hover:decoration-accent transition-all">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-600 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <MagneticButton className="w-full">
                        <button className="w-full relative px-8 py-4 bg-neutral-dark text-white rounded-xl overflow-hidden group font-bold text-lg shadow-xl shadow-neutral-dark/20 hover:shadow-neutral-dark/40 transition-shadow">
                            <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <div className="relative flex items-center justify-center gap-3 group-hover:text-neutral-dark transition-colors">
                                <span>Sign In</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </MagneticButton>
                </div>
            </form>

            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500 font-bold">Or continue with</span>
                </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-neutral-dark shadow-sm hover:shadow-md group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                <span>Sign in with Google</span>
            </button>
        </>
    );
}

function RegisterForm() {
    return (
        <>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 group">
                        <label htmlFor="firstName" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-accent-700 transition-colors">First Name</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-600 transition-colors">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                id="firstName"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
                                placeholder="John"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 group">
                        <label htmlFor="lastName" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-accent-700 transition-colors">Last Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="lastName"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-accent-700 transition-colors">Email Address</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-600 transition-colors">
                            <Mail className="w-4 h-4" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label htmlFor="phone" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-accent-700 transition-colors">Phone Number</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-600 transition-colors">
                            <Phone className="w-4 h-4" />
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label htmlFor="password" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-accent-700 transition-colors">Password</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-600 transition-colors">
                            <Lock className="w-4 h-4" />
                        </div>
                        <input
                            type="password"
                            id="password"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
                            placeholder="Create a strong password"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <MagneticButton className="w-full">
                        <button className="w-full relative px-8 py-4 bg-neutral-dark text-white rounded-xl overflow-hidden group font-bold text-lg shadow-xl shadow-neutral-dark/20 hover:shadow-neutral-dark/40 transition-shadow">
                            <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <div className="relative flex items-center justify-center gap-3 group-hover:text-neutral-dark transition-colors">
                                <span>Create Account</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </MagneticButton>
                </div>
            </form>

            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500 font-bold">Or continue with</span>
                </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-neutral-dark shadow-sm hover:shadow-md group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                <span>Sign up with Google</span>
            </button>
        </>
    );
}
