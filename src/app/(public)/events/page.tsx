'use client';

import { useState } from 'react';
import { EventCard } from '@/components/landing/EventCard';
import { Code, Cpu, Trophy, Mic, Rocket, Users, Target, Zap, Music, Video, Shield, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'department', label: 'Departmentwise Events' },
    { id: 'general', label: 'General Events' },
    { id: 'technical', label: 'Technical Events' },
    { id: 'non-technical', label: 'Non-Technical Events' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'hackathon', label: 'Hackathons' },
    { id: 'media', label: 'Media' },
    { id: 'cultural', label: 'Culturals' },
    { id: 'tech-hub', label: 'Tech-Hub' },
    { id: 'ncc', label: 'NCC' },
];

const events = [
    // Hackathons
    {
        id: 1,
        title: "Hackathon 2026",
        description: "24-hour coding marathon to solve real-world problems. Build, innovate, and win big prizes.",
        icon: <Code className="w-6 h-6" />,
        href: "/events/hackathon",
        category: "hackathon",
        accentColor: "blue" as const
    },
    // Technical
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
        title: "Code Debugging",
        description: "Find and fix bugs in complex algorithms under time pressure.",
        icon: <Code className="w-6 h-6" />,
        href: "/events/debugging",
        category: "technical",
        accentColor: "blue" as const
    },
    // Workshops
    {
        id: 5,
        title: "AI Workshop",
        description: "Hands-on workshop on Generative AI and Large Language Models by industry experts.",
        icon: <Rocket className="w-6 h-6" />,
        href: "/events/ai-workshop",
        category: "workshop",
        accentColor: "blue" as const
    },
    {
        id: 6,
        title: "Web3 Bootcamp",
        description: "Crash course on Blockchain, Smart Contracts, and DApps development.",
        icon: <Zap className="w-6 h-6" />,
        href: "/events/web3-bootcamp",
        category: "workshop",
        accentColor: "yellow" as const
    },
    // Non-Technical
    {
        id: 7,
        title: "Gaming Tournament",
        description: "Competitive e-sports tournament featuring Valorant, FIFA, and BGMI.",
        icon: <Trophy className="w-6 h-6" />,
        href: "/events/gaming",
        category: "non-technical",
        accentColor: "orange" as const
    },
    {
        id: 8,
        title: "Startup Pitch",
        description: "Pitch your startup idea to investors and win incubation support.",
        icon: <Target className="w-6 h-6" />,
        href: "/events/startup-pitch",
        category: "non-technical",
        accentColor: "blue" as const
    },
    {
        id: 9,
        title: "Treasure Hunt",
        description: "Decipher clues, solve puzzles, and race against time across the campus.",
        icon: <Users className="w-6 h-6" />,
        href: "/events/treasure-hunt",
        category: "non-technical",
        accentColor: "yellow" as const
    },
    // Departmentwise
    {
        id: 10,
        title: "Civil Structures",
        description: "Build efficient structures using limited materials. A test of engineering dynamics.",
        icon: <Shield className="w-6 h-6" />,
        href: "/events/civil-structures",
        category: "department",
        accentColor: "orange" as const
    },
    {
        id: 11,
        title: "Circuit Design",
        description: "Design and implement complex analog and digital circuits.",
        icon: <Cpu className="w-6 h-6" />,
        href: "/events/circuit-design",
        category: "department",
        accentColor: "blue" as const
    },
    // General
    {
        id: 12,
        title: "Quiz Wiz",
        description: "General knowledge and tech quiz to test your awareness and quick thinking.",
        icon: <Mic className="w-6 h-6" />,
        href: "/events/quiz",
        category: "general",
        accentColor: "yellow" as const
    },
    // Culturals
    {
        id: 13,
        title: "Battle of Bands",
        description: "Live musical face-off between the best college bands in the region.",
        icon: <Music className="w-6 h-6" />,
        href: "/events/battle-bands",
        category: "cultural",
        accentColor: "orange" as const
    },
    {
        id: 14,
        title: "Dance Off",
        description: "Group dance competition showcasing various styles and themes.",
        icon: <Users className="w-6 h-6" />,
        href: "/events/dance-off",
        category: "cultural",
        accentColor: "blue" as const
    },
    // Media
    {
        id: 15,
        title: "Short Film Fest",
        description: "Screening of creative short films directed by students.",
        icon: <Video className="w-6 h-6" />,
        href: "/events/short-film",
        category: "media",
        accentColor: "yellow" as const
    },
    {
        id: 16,
        title: "Photography",
        description: "Capture the essence of the fest. Theme based photography contest.",
        icon: <Target className="w-6 h-6" />,
        href: "/events/photography",
        category: "media",
        accentColor: "blue" as const
    },
    // Tech-Hub
    {
        id: 17,
        title: "Idea Presentation",
        description: "Present your innovative ideas for the college tech hub.",
        icon: <Zap className="w-6 h-6" />,
        href: "/events/idea-pres",
        category: "tech-hub",
        accentColor: "orange" as const
    },
    // NCC
    {
        id: 18,
        title: "Obstacle Course",
        description: "Physical endurance test organized by the NCC unit.",
        icon: <Shield className="w-6 h-6" />,
        href: "/events/obstacle",
        category: "ncc",
        accentColor: "yellow" as const
    },
    {
        id: 19,
        title: "Drill Competition",
        description: "Display of discipline and coordination in squad drills.",
        icon: <Users className="w-6 h-6" />,
        href: "/events/drill",
        category: "ncc",
        accentColor: "blue" as const
    }
];

export default function EventsPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredEvents = activeCategory === 'all'
        ? events
        : events.filter(event => event.category === activeCategory);

    return (
        <div className="min-h-screen bg-cream pt-24 md:pt-32 pb-20">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-neutral-dark mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none -z-10" />

            <div className="container-custom mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="font-heading font-bold text-4xl md:text-6xl text-neutral-dark animate-fade-in-up">
                        Explore <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-500 to-accent-500">Events</span>
                    </h1>
                    <p className="text-lg text-neutral-dark/60 max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Dive into a world of competition, learning, and celebration across multiple disciplines.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
                    {/* Sidebar Navigation - Desktop */}
                    <div className="hidden lg:block w-64 shrink-0 sticky top-32">
                        <div className="flex flex-col space-y-1">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={cn(
                                        "text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden",
                                        activeCategory === category.id
                                            ? "text-secondary-500 bg-secondary-500/5 font-bold shadow-sm"
                                            : "text-neutral-dark/60 hover:bg-neutral-dark/5 hover:text-neutral-dark"
                                    )}
                                >
                                    {activeCategory === category.id && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-500"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Horizontal Scroll Navigation */}
                    <div className="lg:hidden w-full overflow-x-auto pb-4 -mx-4 px-4 sticky top-[70px] z-30 bg-cream/90 backdrop-blur-md">
                        <div className="flex space-x-2 md:justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={cn(
                                        "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                                        activeCategory === category.id
                                            ? "bg-secondary-500 text-white border-secondary-500"
                                            : "bg-white text-neutral-dark/60 border-gray-200"
                                    )}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Events Grid Content */}
                    <div className="flex-1 w-full min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {filteredEvents.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className="animate-fade-in-up"
                                        style={{ animationDelay: `${index * 50}ms` }}
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
                            </motion.div>
                        </AnimatePresence>

                        {/* Empty State */}
                        {filteredEvents.length === 0 && (
                            <div className="text-center py-20 text-neutral-dark/60 bg-white rounded-2xl border border-dashed border-neutral-dark/10">
                                <p className="text-xl">No events found in this category yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
