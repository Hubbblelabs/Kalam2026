'use client';

import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, User, Mail, Phone, Lock } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gray-50 relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,179,1,0.15),transparent_40%)]" />

            {/* Dot Grid Overlay */}
            <div className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="container-custom max-w-5xl relative z-10">
                <div className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row-reverse min-h-[700px] shadow-2xl animate-fade-in-up border border-white/40 bg-white/80">

                    {/* Right Side - Visual (Yellow Prominent) */}
                    <div className="w-full md:w-5/12 bg-accent relative p-10 text-neutral-dark flex flex-col justify-between overflow-hidden border-l border-black/5">
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                        <div className="absolute top-1/2 right-0 w-40 h-40 bg-orange-400/20 rounded-full blur-[60px]" />

                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

                        <div className="relative z-10 flex justify-end animate-fade-in delay-100">
                            <Link href="/" className="font-heading font-black text-2xl tracking-tighter text-neutral-dark hover:text-white transition-colors">KALAM 2026</Link>
                        </div>

                        <div className="relative z-10 space-y-6 my-auto text-right animate-slide-in-right delay-200">
                            <h2 className="font-heading font-bold text-5xl leading-[0.9] tracking-tight">
                                <span className="text-neutral-dark">Join the</span> <br />
                                <span className="text-white drop-shadow-sm">Revolution.</span>
                            </h2>
                            <p className="text-neutral-dark/80 text-lg font-medium leading-relaxed ml-auto max-w-xs">
                                Create your account to enable event registration, team formation, and certification.
                            </p>
                        </div>

                        <div className="relative z-10 mt-auto pt-8 flex justify-end animate-fade-in delay-300">
                            <div className="text-right">
                                <div className="text-3xl font-black text-neutral-dark mb-1">2000+</div>
                                <div className="text-xs text-neutral-dark/70 uppercase tracking-widest font-bold">Registrations</div>
                            </div>
                        </div>
                    </div>

                    {/* Left Side - Form */}
                    <div className="w-full md:w-7/12 p-10 md:p-14 bg-white/60 backdrop-blur-md flex flex-col justify-center relative">
                        <div className="max-w-md mx-auto w-full space-y-8 animate-fade-in delay-200">
                            <div className="space-y-2">
                                <h3 className="font-heading text-3xl font-bold text-neutral-dark">Create Account</h3>
                                <p className="text-gray-500">Already have an account? <Link href="/login" className="text-primary-600 font-bold hover:text-accent transition-colors">Sign in</Link></p>
                            </div>

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
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
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
                                                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
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
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
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
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
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
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm text-sm"
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
