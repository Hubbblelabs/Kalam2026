export function ScheduleHeader() {
    return (
        <div className="pt-40 pb-16 px-6 container mx-auto max-w-4xl text-center md:text-left animate-fade-in-up">
            <div className="inline-block px-3 py-1 mb-6 border border-[#1C5D99] rounded-full bg-[#1C5D99]/5 backdrop-blur-sm text-[#1C5D99] text-xs font-bold uppercase tracking-widest">
                Official Timeline
            </div>
            <h1 className="font-heading font-black text-6xl md:text-8xl mb-6 tracking-tight leading-none text-[#1C2533]">
                Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B301] to-[#FF8C00]">Schedule</span>
            </h1>
            <p className="text-xl text-[#6B7B8C] font-medium max-w-xl leading-relaxed">
                Navigate the future. One timeline, endless possibilities.
            </p>
        </div>
    );
}
