'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

interface LoginFormProps {
    isAdmin?: boolean;
}

export function LoginForm({ isAdmin = false }: LoginFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const endpoint = isAdmin ? '/api/auth/admin-login' : '/api/auth/login';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Trigger auth state update
            window.dispatchEvent(new CustomEvent('auth-change'));

            // Redirect on success based on role
            if (isAdmin || data.data.user.role === 'admin') {
                router.push('/admin');
                router.refresh();
            } else {
                router.replace('/');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-200">
                        {error}
                    </div>
                )}
                <div className="space-y-5">
                    <div className="space-y-2 group">
                        <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-[#F5B301] transition-colors">Email Address</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F5B301] transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#F5B301] focus:ring-4 focus:ring-[#F5B301]/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 group">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-[#F5B301] transition-colors">Password</label>
                            <Link href="/forgot-password" className="text-xs text-primary-600 font-bold hover:text-[#F5B301] underline decoration-transparent hover:decoration-[#F5B301] transition-all">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F5B301] transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#F5B301] focus:ring-4 focus:ring-[#F5B301]/20 outline-none transition-all placeholder:text-gray-300 font-medium text-neutral-dark shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <MagneticButton className="w-full">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative px-8 py-4 bg-neutral-dark text-white rounded-xl overflow-hidden group font-bold text-lg shadow-xl shadow-neutral-dark/20 hover:shadow-neutral-dark/40 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-[#F5B301] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <div className="relative flex items-center justify-center gap-3 group-hover:text-neutral-dark transition-colors">
                                <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                                {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
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
