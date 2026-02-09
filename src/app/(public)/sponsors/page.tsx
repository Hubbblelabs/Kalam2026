'use client';

const sponsors = [
    {
        tier: 'Title Sponsor',
        companies: [
            { name: 'TechGiant', logo: 'https://via.placeholder.com/200x80?text=TechGiant' }
        ]
    },
    {
        tier: 'Platinum Sponsors',
        companies: [
            { name: 'CloudCorp', logo: 'https://via.placeholder.com/200x80?text=CloudCorp' },
            { name: 'InnovateAI', logo: 'https://via.placeholder.com/200x80?text=InnovateAI' }
        ]
    },
    {
        tier: 'Gold Sponsors',
        companies: [
            { name: 'DevStudio', logo: 'https://via.placeholder.com/200x80?text=DevStudio' },
            { name: 'FutureSystems', logo: 'https://via.placeholder.com/200x80?text=FutureSystems' },
            { name: 'QuantumBits', logo: 'https://via.placeholder.com/200x80?text=QuantumBits' }
        ]
    },
    {
        tier: 'Silver Sponsors',
        companies: [
            { name: 'CodeWorks', logo: 'https://via.placeholder.com/200x80?text=CodeWorks' },
            { name: 'DataFlow', logo: 'https://via.placeholder.com/200x80?text=DataFlow' },
            { name: 'SecureNet', logo: 'https://via.placeholder.com/200x80?text=SecureNet' },
            { name: 'BioTech', logo: 'https://via.placeholder.com/200x80?text=BioTech' }
        ]
    }
];

export default function SponsorsPage() {
    return (
        <div className="min-h-screen bg-[#Fdfdf8] pt-32 pb-20">
            <div className="container-custom">
                <div className="text-center mb-20 space-y-4">
                    <h1 className="font-heading font-bold text-5xl md:text-7xl text-[#1C2533] animate-fade-in-up">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C5D99] to-[#F5B301]">Sponsors</span>
                    </h1>
                    <p className="text-xl text-[#6B7B8C] max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Kalam 2026 is made possible by the generous support of our industry partners.
                    </p>
                </div>

                <div className="space-y-20">
                    {sponsors.map((group, index) => (
                        <div
                            key={index}
                            className="animate-fade-in-up text-center"
                            style={{ animationDelay: `${index * 200 + 200}ms` }}
                        >
                            <h2 className="text-2xl font-bold text-[#1C5D99] mb-8 uppercase tracking-widest relative inline-block">
                                {group.tier}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#F5B301] rounded-full" />
                            </h2>

                            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                                {group.companies.map((company, i) => (
                                    <div
                                        key={i}
                                        className={`glass-card p-8 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300 ${index === 0 ? 'w-full max-w-md h-48 bg-gradient-to-br from-[#1C5D99]/5 to-[#F5B301]/5' :
                                                index === 1 ? 'w-full max-w-xs h-40' :
                                                    'w-48 h-32'
                                            }`}
                                    >
                                        <span className="text-xl font-bold text-gray-400 opacity-60">{company.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center p-12 bg-[#1C2533] rounded-3xl text-white relative overflow-hidden animate-fade-in-up delay-500">
                    <div className="absolute inset-0 bg-[radial-gradient(#F5B301_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-4">Want to sponsor us?</h3>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Connect with thousands of talented students and showcase your brand.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 bg-[#F5B301] text-[#1C2533] font-bold rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
