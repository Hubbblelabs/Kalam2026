'use client';

import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-[#Fdfdf8] flex items-center justify-center py-20">
            <div className="container-custom max-w-6xl">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse min-h-[600px] animate-fade-in-up">

                    {/* Right Side - Visual */}
                    <div className="w-full md:w-1/2 bg-[#1C2533] relative p-12 text-white flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(#1C5D99_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
                        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#1C5D99]/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />

                        <div className="relative z-10 text-right">
                            <Link href="/" className="font-heading font-black text-2xl tracking-tighter">KALAM 2026</Link>
                        </div>

                        <div className="relative z-10 space-y-6">
                            <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight">Join the Revolution</h2>
                            <p className="text-gray-300 text-lg">Create your account to participate in events, form teams, and be part of the largest technical symposium.</p>
                        </div>
                    </div>

                    {/* Left Side - Form */}
                    <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full space-y-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-bold text-[#1C2533]">Create Account</h3>
                                <p className="text-[#6B7B8C] mt-2">Already have an account? <Link href="/login" className="text-[#1C5D99] font-semibold hover:underline">Sign In</Link></p>
                            </div>

                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-semibold text-[#1C2533] ml-1">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-semibold text-[#1C2533] ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

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
                                    <label htmlFor="phone" className="text-sm font-semibold text-[#1C2533] ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-semibold text-[#1C2533] ml-1">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="Create a strong password"
                                    />
                                </div>

                                <MagneticButton className="w-full pt-2">
                                    <button className="w-full relative px-8 py-4 bg-[#1C5D99] text-white rounded-xl overflow-hidden group font-medium text-lg shadow-lg shadow-[#1C5D99]/20">
                                        <div className="absolute inset-0 bg-[#F5B301] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                        <div className="relative flex items-center justify-center gap-3">
                                            <span>Create Account</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </button>
                                </MagneticButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
