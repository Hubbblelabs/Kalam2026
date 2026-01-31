'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const faqs = [
    {
        category: 'General',
        items: [
            {
                question: 'When and where is Kalam 2026 taking place?',
                answer: 'Kalam 2026 will be held on March 15th and 16th, 2026, at the University Main Campus, Tech City. The event begins at 9:00 AM each day.'
            },
            {
                question: 'Who can participate in Kalam 2026?',
                answer: 'The event is open to students from all engineering colleges, universities, and schools (for specific events) across the country. Valid student ID cards are mandatory.'
            },
            {
                question: 'Is there a registration fee?',
                answer: 'Yes, there is a nominal registration fee of ₹300 which covers access to all events, workshops, and lunch for both days.'
            }
        ]
    },
    {
        category: 'Events & Participation',
        items: [
            {
                question: 'Can I participate in multiple events?',
                answer: 'Yes, you can register for multiple events as long as their schedules do not clash. Please check the schedule page before registering.'
            },
            {
                question: 'Do I need to bring my own laptop for the Hackathon?',
                answer: 'Yes, participants are required to bring their own laptops and chargers. Wi-Fi and power sockets will be provided at the venue.'
            },
            {
                question: 'What is the team size for RoboWars?',
                answer: 'A team can consisting of 3 to 5 members. All team members must be from the same institution.'
            }
        ]
    },
    {
        category: 'Accomodation',
        items: [
            {
                question: 'Is accomodation provided for outstation participants?',
                answer: 'Yes, limited accommodation is available on a first-come, first-served basis within the campus hostels for a small additional fee.'
            },
            {
                question: 'How do I book accomodation?',
                answer: 'You can select the accommodation option while registering on our website. Confirmation will be sent via email.'
            }
        ]
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#Fdfdf8] pt-32 pb-20">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="font-heading font-bold text-5xl md:text-7xl text-[#1C2533] animate-fade-in-up">
                        frequently asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C5D99] to-[#F5B301]">questions</span>
                    </h1>
                    <p className="text-xl text-[#6B7B8C] max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Everything you need to know about Kalam 2026. Can't find the answer? Contact us directly.
                    </p>
                </div>

                {/* Search Bar - Visual only */}
                <div className="relative max-w-xl mx-auto mb-16 animate-fade-in-up delay-200">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="w-full pl-12 pr-6 py-4 rounded-full bg-white border border-gray-200 shadow-sm focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all"
                    />
                </div>

                <div className="space-y-12">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex} className="animate-fade-in-up" style={{ animationDelay: `${catIndex * 100 + 300}ms` }}>
                            <h2 className="text-2xl font-bold text-[#1C5D99] mb-6 border-b border-gray-200 pb-2">{category.category}</h2>
                            <div className="space-y-4">
                                {category.items.map((item, itemIndex) => {
                                    const id = `${catIndex}-${itemIndex}`;
                                    const isOpen = openIndex === id;

                                    return (
                                        <div
                                            key={itemIndex}
                                            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#F5B301] shadow-md' : 'border-gray-100 hover:border-gray-200'
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleAccordion(id)}
                                                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                            >
                                                <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-[#1C5D99]' : 'text-[#1C2533]'}`}>
                                                    {item.question}
                                                </span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-[#F5B301]" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                                )}
                                            </button>

                                            <div
                                                className={`px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                                    }`}
                                            >
                                                <p className="text-[#6B7B8C] leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
