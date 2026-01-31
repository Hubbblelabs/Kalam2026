'use client';

import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#Fdfdf8] flex items-center justify-center py-20">
            <div className="container-custom max-w-6xl">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in-up">

                    {/* Left Side - Visual */}
                    <div className="w-full md:w-1/2 bg-[#1C5D99] relative p-12 text-white flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(#F5B301_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5B301]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5B301]/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10">
                            <Link href="/" className="font-heading font-black text-2xl tracking-tighter">KALAM 2026</Link>
                        </div>

                        <div className="relative z-10 space-y-6">
                            <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight">Welcome Back, Innovator!</h2>
                            <p className="text-gray-200 text-lg">Access your dashboard to manage event registrations, team details, and certificates.</p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full space-y-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-bold text-[#1C2533]">Sign In</h3>
                                <p className="text-[#6B7B8C] mt-2">New here? <Link href="/register" className="text-[#1C5D99] font-semibold hover:underline">Create an account</Link></p>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-[#1C2533] ml-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="password" className="text-sm font-semibold text-[#1C2533] ml-1">Password</label>
                                            <a href="#" className="text-xs text-[#1C5D99] font-semibold hover:underline">Forgot password?</a>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <MagneticButton className="w-full">
                                    <button className="w-full relative px-8 py-4 bg-[#1C5D99] text-white rounded-xl overflow-hidden group font-medium text-lg shadow-lg shadow-[#1C5D99]/20">
                                        <div className="absolute inset-0 bg-[#F5B301] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                        <div className="relative flex items-center justify-center gap-3">
                                            <span>Sign In</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </button>
                                </MagneticButton>
                            </form>

                            <div className="flex items-center gap-4">
                                <div className="h-px bg-gray-200 flex-1" />
                                <span className="text-xs text-gray-400 font-medium uppercase">Or continue with</span>
                                <div className="h-px bg-gray-200 flex-1" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-[#1C2533]">
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-[#1C2533]">
                                    GitHub
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
