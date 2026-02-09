export function ScheduleHeader() {
    return (
        <div className="pt-40 pb-16 px-6 container mx-auto max-w-4xl text-center md:text-left animate-fade-in-up">
            <div className="inline-block px-3 py-1 mb-6 border border-secondary-500 rounded-full bg-secondary-500/5 backdrop-blur-sm text-secondary-500 text-xs font-bold uppercase tracking-widest">
                Official Timeline
            </div>
            <h1 className="font-heading font-black text-6xl md:text-8xl mb-6 tracking-tight leading-none text-neutral-dark">
                Event <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-500 to-accent-orange">Schedule</span>
            </h1>
            <p className="text-xl text-neutral-dark/60 font-medium max-w-xl leading-relaxed">
                Navigate the future. One timeline, endless possibilities.
            </p>
        </div>
    );
}
