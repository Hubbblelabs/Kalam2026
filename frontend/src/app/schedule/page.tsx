'use client';

import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const scheduleData = [
    {
        day: 'Day 1',
        date: 'March 15, 2026',
        events: [
            {
                time: '09:00 AM',
                title: 'Inauguration Ceremony',
                venue: 'Main Auditorium',
                description: 'Kickstarting Kalam 2026 with inspiring keynote speakers.',
                type: 'general'
            },
            {
                time: '10:30 AM',
                title: 'Hackathon Begins',
                venue: 'Tech Park Hall A',
                description: '24-hour coding marathon starts. Teams assemble!',
                type: 'competition'
            },
            {
                time: '11:00 AM',
                title: 'AI Workshop',
                venue: 'Seminar Hall 1',
                description: 'Hands-on session on Generative AI by industry leaders.',
                type: 'workshop'
            },
            {
                time: '02:00 PM',
                title: 'Paper Presentation',
                venue: 'Conference Room B',
                description: 'Showcasing innovative research and technical papers.',
                type: 'competition'
            },
            {
                time: '04:00 PM',
                title: 'RoboWars Qualifiers',
                venue: 'Open Air Theatre',
                description: 'High-octane robot battles. Round 1.',
                type: 'competition'
            }
        ]
    },
    {
        day: 'Day 2',
        date: 'March 16, 2026',
        events: [
            {
                time: '09:00 AM',
                title: 'Hackathon Judging',
                venue: 'Tech Park Hall A',
                description: 'Evaluation of final hackathon projects.',
                type: 'competition'
            },
            {
                time: '11:00 AM',
                title: 'Startup Pitch Finale',
                venue: 'Main Auditorium',
                description: 'Top startups pitch to a panel of investors.',
                type: 'competition'
            },
            {
                time: '02:30 PM',
                title: 'RoboWars Finals',
                venue: 'Open Air Theatre',
                description: 'The ultimate showdown for the robotics championship.',
                type: 'competition'
            },
            {
                time: '05:00 PM',
                title: 'Valedictory Function',
                venue: 'Main Auditorium',
                description: 'Prize distribution and closing ceremony.',
                type: 'general'
            },
            {
                time: '07:00 PM',
                title: 'Cultural Night',
                venue: 'College Ground',
                description: 'Music, dance, and DJ night to wrap up the fest.',
                type: 'fun'
            }
        ]
    }
];

export default function SchedulePage() {
    return (
        <div className="min-h-screen bg-[#Fdfdf8] pt-32 pb-20">
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(#1C5D99_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-20 space-y-4">
                    <h1 className="font-heading font-bold text-5xl md:text-7xl text-[#1C2533] animate-fade-in-up">
                        Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C5D99] to-[#F5B301]">Schedule</span>
                    </h1>
                    <p className="text-xl text-[#6B7B8C] max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Plan your days at Kalam 2026. Don't miss out on the action!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {scheduleData.map((dayData, dayIndex) => (
                        <div
                            key={dayIndex}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${dayIndex * 200 + 300}ms` }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-[#1C5D99]/10 p-3 rounded-2xl text-[#1C5D99]">
                                    <Calendar className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-[#1C2533]">{dayData.day}</h2>
                                    <p className="text-[#6B7B8C] font-medium">{dayData.date}</p>
                                </div>
                            </div>

                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                {dayData.events.map((event, index) => (
                                    <div key={index} className="relative flex items-start group">
                                        <div className="absolute left-0 mt-1.5 ml-[15px] -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white bg-[#1C5D99] ring-4 ring-[#1C5D99]/10 group-hover:bg-[#F5B301] group-hover:scale-125 transition-all duration-300 z-10" />

                                        <div className="ml-12 w-full p-6 glass-card rounded-2xl hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-[#F5B301] group-hover:-translate-y-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                                <div className="flex items-center gap-2 text-[#F5B301] font-semibold text-sm bg-[#F5B301]/10 px-3 py-1 rounded-full w-fit">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {event.time}
                                                </div>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${event.type === 'competition' ? 'border-red-200 text-red-600 bg-red-50' :
                                                        event.type === 'workshop' ? 'border-blue-200 text-blue-600 bg-blue-50' :
                                                            event.type === 'fun' ? 'border-purple-200 text-purple-600 bg-purple-50' :
                                                                'border-gray-200 text-gray-600 bg-gray-50'
                                                    }`}>
                                                    {event.type.toUpperCase()}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#1C2533] mb-2">{event.title}</h3>
                                            <p className="text-[#6B7B8C] text-sm mb-4 leading-relaxed">{event.description}</p>

                                            <div className="flex items-center gap-2 text-sm text-[#5AA7DE] font-medium">
                                                <MapPin className="w-4 h-4" />
                                                {event.venue}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
