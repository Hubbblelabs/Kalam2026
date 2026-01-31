import Link from 'next/link';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#Fdfdf8] text-[#1C2533] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#F5B301]/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#1C5D99]/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(28,93,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,93,153,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"
            />

            <div className="relative z-10 text-center px-6">
                <h1 className="font-heading font-black text-[15vw] md:text-[12rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#1C2533] to-[#1C5D99]/50 select-none animate-fade-in-up">
                    404
                </h1>

                <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1C5D99]">
                        Lost in Space?
                    </h2>
                    <p className="text-xl text-[#6B7B8C] max-w-lg mx-auto">
                        The page you are looking for has drifted into a black hole or never existed in this dimension.
                    </p>
                </div>

                <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                    <MagneticButton href="/">
                        <div className="group relative px-8 py-4 bg-[#1C2533] text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl">
                            <div className="absolute inset-0 bg-[#F5B301] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <div className="relative flex items-center gap-3 font-medium">
                                <span>Return to Base</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </MagneticButton>
                </div>
            </div>
        </div>
    );
}
