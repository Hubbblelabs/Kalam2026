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
        slow: '40s',
        normal: '30s',
        fast: '20s'
    };

    const animationStyle = {
        animationDuration: speedMap[speed],
        animationDirection: direction === 'right' ? 'reverse' : 'normal'
    };

    return (
        <div className="relative overflow-hidden py-6 bg-primary">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary to-transparent z-10" />

            <div
                className="flex whitespace-nowrap animate-marquee"
                style={animationStyle}
            >
                {/* Double the items for seamless loop */}
                {[...items, ...items].map((item, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center mx-8 text-white/90 text-lg md:text-xl font-medium"
                    >
                        <span className="w-2 h-2 bg-accent rounded-full mr-4" />
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
