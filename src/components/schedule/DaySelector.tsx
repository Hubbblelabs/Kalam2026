import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ScheduleDay {
    label: string;
    date: string;
    events: any[]; // Using any[] here to avoid circular dependencies or complex type imports for now, but should strictly be EventData[]
}

export type ScheduleData = Record<string, ScheduleDay>;

interface DaySelectorProps {
    activeTab: string;
    onTabChange: (key: string) => void;
    scheduleData: ScheduleData;
    scrolled: boolean;
}

export function DaySelector({ activeTab, onTabChange, scheduleData, scrolled }: DaySelectorProps) {
    return (
        <div className={cn(
            "sticky top-0 z-40 transition-all duration-300 border-b border-black/0",
            scrolled ? "bg-cream/80 backdrop-blur-xl border-black/5 py-4 shadow-lg shadow-black/5" : "bg-transparent py-4"
        )}>
            <div className="container mx-auto max-w-4xl px-6 flex justify-center md:justify-start">
                <div className="inline-flex bg-neutral-dark/5 p-1 rounded-full relative backdrop-blur-md border border-neutral-dark/5">
                    {(Object.keys(scheduleData) as Array<keyof typeof scheduleData>).map((key) => (
                        <button
                            key={key}
                            onClick={() => onTabChange(key as string)}
                            className={cn(
                                "relative px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 select-none min-w-[130px] z-10",
                                activeTab === key ? "text-neutral-dark" : "text-neutral-dark/60 hover:text-neutral-dark"
                            )}
                        >
                            <span className="relative z-20 mr-2 uppercase tracking-wide">{scheduleData[key].label}</span>
                            <span className={cn("relative z-20 text-xs opacity-70 font-normal", activeTab === key && "opacity-100 font-bold")}>
                                {scheduleData[key].date}
                            </span>

                            {activeTab === key && (
                                <motion.div
                                    layoutId="activeTabBackground"
                                    className="absolute inset-0 bg-accent-500 rounded-full shadow-[0_0_20px_rgba(245,179,1,0.4)] z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
