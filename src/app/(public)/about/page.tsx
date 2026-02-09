'use client';

import { useEffect, useState } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, Target, Lightbulb } from 'lucide-react';

export default function AboutPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/session');
                if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
                    setIsLoggedIn(false);
                    return;
                } 
                const data = await res.json();
                setIsLoggedIn(data.success && data.data?.user);
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setIsCheckingAuth(false);
            }
        };

        checkAuth();

        const handleAuthChange = () => {
            checkAuth();
        };

        window.addEventListener('auth-change', handleAuthChange as EventListener);
        return () => window.removeEventListener('auth-change', handleAuthChange as EventListener);
    }, []);


    return (
        <div className="bg-[#Fdfdf8]">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1C5D99]/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F5B301]/5 rounded-full blur-[100px] animate-pulse delay-1000" />

                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#1C5D99]/10 text-[#1C5D99] font-medium text-sm mb-6 animate-fade-in-up">
                        Est. 2005
                    </span>
                    <h1 className="font-heading font-black text-6xl md:text-8xl text-[#1C2533] mb-8 leading-tight animate-fade-in-up delay-100">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C5D99] to-[#F5B301]">Kalam</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#6B7B8C] max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        A celebration of innovation, technology, and the indomitable spirit of Dr. APJ Abdul Kalam. We bring together the brightest minds to build the future.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white/50 border-y border-gray-100">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                        {[
                            { label: 'Participants', value: '5000+' },
                            { label: 'Colleges', value: '150+' },
                            { label: 'Events', value: '30+' },
                            { label: 'Prize Pool', value: '₹5L+' }
                        ].map((stat, index) => (
                            <div key={index} className="animate-fade-in pr-8 last:pr-0 border-r-0 last:border-r-0 md:border-r border-gray-100 last:md:border-r-0">
                                <div className="font-heading font-bold text-4xl md:text-5xl text-[#1C5D99] mb-2">{stat.value}</div>
                                <div className="text-sm font-medium tracking-wide text-[#6B7B8C] uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                        <div className="space-y-8 animate-slide-in-left">
                            <div className="flex gap-4 items-start">
                                <div className="p-4 rounded-xl bg-[#1C5D99]/10 text-[#1C5D99]">
                                    <Lightbulb className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-[#1C2533] mb-4">Our Vision</h3>
                                    <p className="text-[#6B7B8C] leading-relaxed text-lg">
                                        To serve as a premier platform for technical excellence, fostering a community of innovators who leverage technology to solve real-world challenges and contribute to nation-building.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="p-4 rounded-xl bg-[#F5B301]/10 text-[#F5B301]">
                                    <Target className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-[#1C2533] mb-4">Our Mission</h3>
                                    <p className="text-[#6B7B8C] leading-relaxed text-lg">
                                        To ignite the scientific temper in young minds, promote interdisciplinary collaboration, and bridge the gap between academic learning and industry requirements through practical application.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-slide-in-right">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1C5D99] to-[#F5B301] rounded-3xl -rotate-6 opacity-20 transform scale-95" />
                            <div className="absolute inset-0 bg-[#Fdfdf8] rounded-3xl border border-gray-200 transform rotate-6 scale-95" />
                            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center min-h-[400px]">
                                <blockquote className="text-center">
                                    <p className="font-heading font-bold text-2xl md:text-3xl text-[#1C2533] italic mb-6">
                                        &quot;Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.&quot;
                                    </p>
                                    <cite className="not-italic flex flex-col items-center gap-2">
                                        <span className="font-bold text-[#1C5D99]">Dr. APJ Abdul Kalam</span>
                                        <span className="text-sm text-[#6B7B8C]">Former President of India</span>
                                    </cite>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#1C2533] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#F5B301_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

                <div className="container-custom relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl mb-8">Ready to be part of history?</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                        Join thousands of students from across the nation in this technical extravaganza. {!isLoggedIn && 'Register now and'} Showcase your skills.
                    </p>
                    {!isCheckingAuth && !isLoggedIn && (
                        <div className="flex justify-center">
                            <MagneticButton href="/register">
                                <div className="group relative px-10 py-5 bg-white text-[#1C2533] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl">
                                    <div className="absolute inset-0 bg-[#F5B301] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <div className="relative flex items-center gap-3 font-medium text-lg">
                                        <span>Register Now</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </MagneticButton>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
