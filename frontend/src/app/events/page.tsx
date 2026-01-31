'use client';

import { useState } from 'react';
import { EventCard } from '@/components/landing/EventCard';
import { Code, Cpu, Trophy, Mic, Rocket, Users, Target, Zap } from 'lucide-react';

const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'technical', label: 'Technical' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'non-technical', label: 'Non-Technical' },
];

const events = [
    {
        id: 1,
        title: "Hackathon 2026",
        description: "24-hour coding marathon to solve real-world problems. Build, innovate, and win big prizes.",
        icon: <Code className="w-6 h-6" />,
        href: "/events/hackathon",
        category: "technical",
        accentColor: "blue" as const
    },
    {
        id: 2,
        title: "RoboWars",
        description: "Battle of the bots. Design, build, and destroy in this ultimate robotics showdown.",
        icon: <Cpu className="w-6 h-6" />,
        href: "/events/robowars",
        category: "technical",
        accentColor: "orange" as const
    },
    {
        id: 3,
        title: "Paper Presentation",
        description: "Showcase your research and innovative ideas to a panel of expert judges.",
        icon: <Mic className="w-6 h-6" />,
        href: "/events/paper-presentation",
        category: "technical",
        accentColor: "yellow" as const
    },
    {
        id: 4,
        title: "AI Workshop",
        description: "Hands-on workshop on Generative AI and Large Language Models by industry experts.",
        icon: <Rocket className="w-6 h-6" />,
        href: "/events/ai-workshop",
        category: "workshop",
        accentColor: "blue" as const
    },
    {
        id: 5,
        title: "Gaming Tournament",
        description: "Competitive e-sports tournament featuring Valorant, FIFA, and BGMI.",
        icon: <Trophy className="w-6 h-6" />,
        href: "/events/gaming",
        category: "non-technical",
        accentColor: "orange" as const
    },
    {
        id: 6,
        title: "Startup Pitch",
        description: "Pitch your startup idea to investors and win incubation support.",
        icon: <Target className="w-6 h-6" />,
        href: "/events/startup-pitch",
        category: "non-technical",
        accentColor: "yellow" as const
    },
    {
        id: 7,
        title: "Web3 Bootcamp",
        description: "Crash course on Blockchain, Smart Contracts, and DApps development.",
        icon: <Zap className="w-6 h-6" />,
        href: "/events/web3-bootcamp",
        category: "workshop",
        accentColor: "blue" as const
    },
    {
        id: 8,
        title: "Treasure Hunt",
        description: "Decipher clues, solve puzzles, and race against time across the campus.",
        icon: <Users className="w-6 h-6" />,
        href: "/events/treasure-hunt",
        category: "non-technical",
        accentColor: "orange" as const
    }
];

export default function EventsPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredEvents = activeCategory === 'all'
        ? events
        : events.filter(event => event.category === activeCategory);

    return (
        <div className="min-h-screen bg-[#Fdfdf8] pt-32 pb-20">
            {/* Background Grid */}
            <div
                className="fixed inset-0 bg-[linear-gradient(rgba(28,93,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,93,153,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none -z-10"
            />

            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="font-heading font-bold text-5xl md:text-7xl text-[#1C2533] animate-fade-in-up">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C5D99] to-[#F5B301]">Events</span>
                    </h1>
                    <p className="text-xl text-[#6B7B8C] max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Discover a wide range of technical and non-technical events designed to challenge and inspire.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up delay-200">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                                    ? 'bg-[#1C5D99] text-white shadow-lg scale-105'
                                    : 'bg-white text-[#6B7B8C] border border-gray-200 hover:border-[#1C5D99]/30 hover:bg-gray-50'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <EventCard
                                title={event.title}
                                description={event.description}
                                icon={event.icon}
                                href={event.href}
                                accentColor={event.accentColor}
                            />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-20 text-[#6B7B8C]">
                        <p className="text-xl">No events found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
