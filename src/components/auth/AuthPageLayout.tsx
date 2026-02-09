'use client';

import React from 'react';
import Link from 'next/link';

interface AuthPageLayoutProps {
    children: React.ReactNode;
    heading: string;
    subHeading: string;
    description: string;
    statCount?: string;
    statLabel?: string;
    formTitle: string;
    alternativeLinkText: string;
    alternativeLinkTarget: string;
    alternativeLinkAction: string;
}

export function AuthPageLayout({
    children,
    heading,
    subHeading,
    description,
    statCount,
    statLabel,
    formTitle,
    alternativeLinkText,
    alternativeLinkTarget,
    alternativeLinkAction,
}: AuthPageLayoutProps) {
    return (
        <div className="min-h-screen w-full flex bg-gray-50">
            {/* Visual Side (Yellow Panel) - Hidden on mobile, 5/12 width on desktop */}
            <div className="hidden lg:flex w-5/12 bg-accent relative p-12 text-neutral-dark flex-col justify-between overflow-hidden sticky top-0 h-screen">
                {/* Background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

                <div className="relative z-10 flex items-center justify-between">
                    <Link href="/" className="font-heading font-black text-3xl tracking-tighter text-neutral-dark">KALAM 2026</Link>
                </div>

                <div className="relative z-10 space-y-8 my-auto">
                    <h2 className="font-heading font-bold text-5xl xl:text-6xl leading-[0.9] tracking-tight">
                        <span className="text-neutral-dark">{heading}</span> <br />
                        <span className="text-white drop-shadow-sm">{subHeading}</span>
                    </h2>
                    <p className="text-neutral-dark/80 text-xl font-medium leading-relaxed max-w-sm">
                        {description}
                    </p>
                </div>

                {statLabel && (
                    <div className="relative z-10 mt-auto pt-8">
                        <div className="flex items-center gap-4">
                            <div className="h-1 bg-black w-16 rounded-full" />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold uppercase tracking-widest text-neutral-dark opacity-70">
                                    {statLabel}
                                </span>
                                {statCount && <span className="font-heading font-bold text-2xl">{statCount}</span>}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-7/12 p-8 md:p-16 lg:p-24 bg-white flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full space-y-10 animate-fade-in py-10">

                    {/* Mobile Header logic could be added here if needed, but sticky header usually covers it */}
                    <div className="lg:hidden mb-8">
                        <Link href="/" className="font-heading font-black text-3xl tracking-tighter text-neutral-dark">KALAM 2026</Link>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-heading text-4xl font-bold text-neutral-dark">
                            {formTitle}
                        </h3>
                        <p className="text-gray-500 text-lg">
                            {alternativeLinkText}
                            <Link
                                href={alternativeLinkTarget}
                                className="text-primary-600 font-bold hover:text-accent transition-colors underline decoration-transparent hover:decoration-accent ml-1"
                            >
                                {alternativeLinkAction}
                            </Link>
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
