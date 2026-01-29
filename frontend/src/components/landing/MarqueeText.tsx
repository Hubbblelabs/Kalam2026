'use client';

interface MarqueeTextProps {
    items: string[];
    speed?: 'slow' | 'normal' | 'fast';
    direction?: 'left' | 'right';
}

export function MarqueeText({
    items,
    speed = 'normal',
    direction = 'left'
}: MarqueeTextProps) {
    const speedMap = {
        slow: '60s',
        normal: '40s',
        fast: '25s'
    };

    const animationStyle = {
        animationDuration: speedMap[speed],
        animationDirection: direction === 'right' ? 'reverse' : 'normal'
    };

    return (
        <div className="relative overflow-hidden py-10 bg-[#Fdfdf8] border-y border-black/5">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#Fdfdf8] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#Fdfdf8] to-transparent z-10" />

            <div
                className="flex whitespace-nowrap animate-marquee"
                style={animationStyle}
            >
                {/* Triple the items for safer loop on wide screens */}
                {[...items, ...items, ...items].map((item, index) => (
                    <div key={index} className="flex items-center">
                        <span
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mx-8 text-transparent opacity-80"
                            style={{ 
                                WebkitTextStroke: '1px #1C2533',
                                fontFamily: 'var(--font-heading)'
                            }}
                        >
                            {item}
                        </span>
                        {/* Decorative separator */}
                        <span className="text-4xl text-[#F5B301]">✦</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
