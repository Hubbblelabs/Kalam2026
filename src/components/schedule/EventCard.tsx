import { MapPin, ChevronDown, ChevronUp, Clock, Mic, Zap, Award, User, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type EventType = 'keynote' | 'workshop' | 'competition' | 'panel' | 'fun';

export interface EventData {
    id: string;
    startTime: string;
    period: string;
    title: string;
    speaker: string;
    role: string;
    venue: string;
    description: string;
    type: string;
    tags: string[];
}

interface EventCardProps {
    event: EventData;
    isExpanded: boolean;
    onToggle: () => void;
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'keynote': return <Mic className="w-4 h-4 text-[#F5B301]" />;
        case 'workshop': return <Zap className="w-4 h-4 text-blue-500" />;
        case 'competition': return <Award className="w-4 h-4 text-red-500" />;
        case 'panel': return <User className="w-4 h-4 text-purple-500" />;
        case 'fun': return <Star className="w-4 h-4 text-pink-500" />;
        default: return <User className="w-4 h-4 text-gray-500" />;
    }
};

export function EventCard({ event, isExpanded, onToggle }: EventCardProps) {
    return (
        <div
            onClick={onToggle}
            className="group relative bg-white rounded-2xl p-6 md:p-8 border border-[#1C2533]/5 hover:border-[#1C5D99]/30 hover:shadow-[0_10px_40px_rgba(28,37,51,0.08)] transition-all duration-300 cursor-pointer"
        >
            {/* Hover Glow Gradient - Subtle Blue */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C5D99]/0 via-[#1C5D99]/5 to-[#1C5D99]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

            <div className="flex gap-4 md:gap-10 items-start relative z-10">

                {/* Time Block (Left) with Timeline connector */}
                <div className="flex flex-col items-center justify-start min-w-[80px] md:min-w-[100px] pt-1 relative pr-4 md:pr-6">
                    {/* Continuous Vertical Line - Right Aligned */}
                    <div className="absolute top-0 bottom-[-40px] right-0 w-[2px] bg-[#1C5D99]/10 group-hover:bg-[#1C5D99]/30 transition-colors" />

                    {/* Timeline Dot - Centered on Line */}
                    <div className="absolute top-4 right-[-4px] w-2.5 h-2.5 rounded-full bg-[#Fdfdf8] border-2 border-[#1C5D99] z-20 group-hover:scale-125 transition-transform" />

                    <span className="text-xl md:text-3xl font-black text-[#1C2533] leading-none tracking-tight">
                        {event.startTime}
                    </span>
                    <span className="text-xs font-bold text-[#1C5D99] uppercase mt-2 tracking-widest bg-[#1C5D99]/10 px-2 py-0.5 rounded-md border border-[#1C5D99]/20">
                        {event.period}
                    </span>
                </div>

                {/* Content Block (Right) */}
                <div className="flex-1 min-w-0">
                    {/* Header Row */}
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-bold text-[#1C2533] leading-tight group-hover:text-[#1C5D99] transition-colors">
                                {event.title}
                            </h3>
                            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-[#6B7B8C]">
                                <div className="flex items-center gap-2 text-[#1C2533] font-medium">
                                    {getTypeIcon(event.type)}
                                    {event.speaker}
                                </div>
                                <span className="hidden md:inline w-1 h-1 rounded-full bg-[#1C2533]/30" />
                                <span className="text-[#6B7B8C] italic">{event.role}</span>
                            </div>
                        </div>

                        {/* Expand Icon */}
                        <button
                            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#1C2533]/5 text-[#1C2533]/40 group-hover:bg-[#1C5D99] group-hover:text-white transition-all"
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                        >
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>

                    {/* Venue Chip */}
                    <div className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-[#1C5D99] uppercase tracking-wider bg-[#1C5D99]/5 px-3 py-1 rounded border border-[#1C5D99]/20">
                        <MapPin className="w-3 h-3" />
                        {event.venue}
                    </div>

                    {/* Expandable Details */}
                    <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "anticipate" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 mt-6 border-t border-[#1C2533]/5">
                            <p className="text-[#6B7B8C] leading-relaxed text-base font-light">
                                {event.description}
                            </p>

                            {/* Meta Footer */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                                {event.tags && event.tags.length > 0 && (
                                    <div className="flex gap-2">
                                        {event.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-1 bg-[#1C2533]/5 rounded-md text-xs font-medium text-[#1C2533]/70 border border-[#1C2533]/5 hover:border-[#1C2533]/20 transition-colors">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <button className="text-xs font-bold text-[#1C5D99] hover:text-[#1C2533] transition-colors flex items-center gap-1 uppercase tracking-wider">
                                    <Clock className="w-3 h-3" /> Add to Calendar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Expand Indicator */}
            <div className="md:hidden absolute bottom-4 right-4 text-[#1C2533]/20">
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
        </div>
    );
}
