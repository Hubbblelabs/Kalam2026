'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScheduleHeader } from '@/components/schedule/ScheduleHeader';
import { DaySelector, ScheduleData } from '@/components/schedule/DaySelector';
import { EventCard, EventData } from '@/components/schedule/EventCard';

// --- Data ---
const scheduleData: ScheduleData = {
    day1: {
        label: 'Day 01',
        date: 'March 15',
        events: [
            {
                id: 'd1-1',
                startTime: '09:00',
                period: 'AM',
                title: 'Inauguration Ceremony',
                speaker: 'Dr. A. Sharma',
                role: 'Dean of Technology',
                venue: 'Main Auditorium',
                description: 'The official commencement of Kalam 2026. Join us for the lighting of the lamp and an inspiring keynote address that sets the tone for a weekend of innovation.',
                type: 'keynote',
                tags: ['Opening', 'Mandatory']
            },
            {
                id: 'd1-2',
                startTime: '10:30',
                period: 'AM',
                title: 'Hackathon Kickoff',
                speaker: 'Tech Club Team',
                role: 'Organizers',
                venue: 'Tech Park Hall A',
                description: 'The 24-hour coding marathon begins! Teams will receive their problem statements. Rules and evaluation criteria will be briefed.',
                type: 'competition',
                tags: ['24h', 'Coding']
            },
            {
                id: 'd1-3',
                startTime: '11:00',
                period: 'AM',
                title: 'Generative AI Workshop',
                speaker: 'Sarah Lee',
                role: 'GDE, Machine Learning',
                venue: 'Seminar Hall 1',
                description: 'A deep dive into Building LLM Applications. Participants will learn to use OpenAI API and LangChain. Laptop required.',
                type: 'workshop',
                tags: ['Hands-on', 'Certification']
            },
            {
                id: 'd1-4',
                startTime: '02:00',
                period: 'PM',
                title: 'Paper Presentation',
                speaker: 'Research Forum',
                role: 'Academic Panel',
                venue: 'Conference Room B',
                description: 'Scholars and students present cutting-edge research papers in domains of IoT, Blockchain, and Cybersecurity.',
                type: 'panel',
                tags: ['Academic']
            },
            {
                id: 'd1-5',
                startTime: '04:00',
                period: 'PM',
                title: 'RoboWars Qualifiers',
                speaker: 'Robotics Club',
                role: 'Coordinators',
                venue: 'Open Air Theatre',
                description: 'The preliminary rounds of the Robot Combat tournament. Witness the sparks fly as bots clash in the arena for supremacy.',
                type: 'competition',
                tags: ['Action']
            }
        ]
    },
    day2: {
        label: 'Day 02',
        date: 'March 16',
        events: [
            {
                id: 'd2-1',
                startTime: '09:00',
                period: 'AM',
                title: 'Hackathon Judging',
                speaker: 'Industry Jury',
                role: 'Experts from diverse fields',
                venue: 'Tech Park Hall A',
                description: 'The final evaluation of hackathon projects. Top 10 teams will be selected for the grand stage presentation.',
                type: 'competition',
                tags: ['Finals']
            },
            {
                id: 'd2-2',
                startTime: '11:00',
                period: 'AM',
                title: 'Startup Pitch Finale',
                speaker: 'E-Cell',
                role: 'Investment Panel',
                venue: 'Main Auditorium',
                description: 'High-stakes pitching session where student startups compete for seed funding and incubation support.',
                type: 'panel',
                tags: ['Business']
            },
            {
                id: 'd2-3',
                startTime: '02:30',
                period: 'PM',
                title: 'RoboWars Finals',
                speaker: 'Robotics Club',
                role: 'Grand Finale',
                venue: 'Open Air Theatre',
                description: 'The ultimate showdown. The surviving bots fight for the championship title and grand prize.',
                type: 'competition',
                tags: ['Grand Finale']
            },
            {
                id: 'd2-4',
                startTime: '05:00',
                period: 'PM',
                title: 'Valedictory Function',
                speaker: 'Principal',
                role: 'Head of Institution',
                venue: 'Main Auditorium',
                description: 'Prize distribution ceremony for all events and official closing of the technical symposium.',
                type: 'keynote',
                tags: ['Awards']
            },
            {
                id: 'd2-5',
                startTime: '07:00',
                period: 'PM',
                title: 'Cultural Night',
                speaker: 'Cultural Committee',
                role: 'Performers',
                venue: 'College Ground',
                description: 'Unwind with an evening of music, dance, and DJ performances. A celebration of our community.',
                type: 'fun',
                tags: ['Music', 'DJ']
            }
        ]
    },
    day3: {
        label: 'Day 03',
        date: 'March 17',
        events: [
            {
                id: 'd3-1',
                startTime: '09:30',
                period: 'AM',
                title: 'Project Expo Open House',
                speaker: 'All Participants',
                role: 'Exhibitors',
                venue: 'Innovation Hub',
                description: 'Open showcase of all hackathon and maker projects. Visitors and judges interact with teams to see live demos.',
                type: 'panel',
                tags: ['Exhibition', 'Open for All']
            },
            {
                id: 'd3-2',
                startTime: '11:00',
                period: 'AM',
                title: 'Future Tech Panel',
                speaker: 'Distinguished Guests',
                role: 'Thought Leaders',
                venue: 'Main Auditorium',
                description: 'A visionary discussion on "AI Ethics & The Human Element" featuring industry veterans.',
                type: 'keynote',
                tags: ['Insightful']
            },
            {
                id: 'd3-3',
                startTime: '02:00',
                period: 'PM',
                title: 'Award Ceremony & Closing',
                speaker: 'Chief Guest',
                role: 'Honorable Minister of IT',
                venue: 'Open Air Theatre',
                description: 'The grand conclusion. Winners of Hackathon, RoboWars, and Competitions are awarded trophies and cash prizes.',
                type: 'keynote',
                tags: ['Awards', 'Celebration']
            },
            {
                id: 'd3-4',
                startTime: '05:00',
                period: 'PM',
                title: 'Pro Show: Live Concert',
                speaker: 'The Local Train',
                role: 'Band',
                venue: 'College Ground',
                description: 'Celebrate the spirit of Kalam with an electrifying live performance.',
                type: 'fun',
                tags: ['Concert', 'Music']
            }
        ]
    }
};

export default function ScheduleContent() {
    const [activeTab, setActiveTab] = useState<'day1' | 'day2' | 'day3'>('day1');
    const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    // Sticky Header Effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedEvent(expandedEvent === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-cream text-neutral-dark pb-32 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Architectural Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

            <div className="relative z-10">
                <ScheduleHeader />

                <DaySelector
                    activeTab={activeTab}
                    onTabChange={(key) => setActiveTab(key as 'day1' | 'day2' | 'day3')}
                    scheduleData={scheduleData}
                    scrolled={scrolled}
                />

                {/* Schedule Content */}
                <div className="container mx-auto max-w-4xl px-6 mt-12 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6 relative"
                        >
                            {/* Vertical Line for Desktop - Adjust positioning if needed to align with cards */}
                            {/* <div className="hidden md:block absolute left-[125px] top-4 bottom-4 w-[2px] bg-white/5 rounded-full z-0" /> */}

                            {scheduleData[activeTab].events.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event as EventData}
                                    isExpanded={expandedEvent === event.id}
                                    onToggle={() => toggleExpand(event.id)}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-24 mb-12">
                <p className="text-neutral-dark/40 text-sm font-mono uppercase tracking-widest">
                    Schedule subject to change
                </p>
            </div>
        </div>
    );
}
