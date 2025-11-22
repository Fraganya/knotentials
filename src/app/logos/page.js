import React from 'react';

export default function LogosPage() {
    return (
        <div className="min-h-screen bg-base-100 p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Logo Variations</h1>
            <p className="text-neutral/70 mb-12">Intertwined Rings Concept - Classic Elegance Palette</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">

                {/* Variation 1: Royal Blue & Gold */}
                <div className="card bg-primary text-primary-content shadow-xl p-8 flex flex-col items-center justify-center aspect-video border-4 border-double border-secondary">
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-6">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-secondary stroke-[3]">
                                <circle cx="35" cy="50" r="25" />
                                <circle cx="65" cy="50" r="25" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-serif text-white tracking-widest">KNOTENTIALS</h2>
                        <p className="text-secondary text-xs uppercase tracking-[0.4em] mt-2">Wedding Planner</p>
                    </div>
                    <p className="mt-8 text-white/50 text-sm">Variation 1: Royal Blue & Gold</p>
                </div>

                {/* Variation 2: White & Royal Blue */}
                <div className="card bg-white shadow-xl p-8 flex flex-col items-center justify-center aspect-video border border-base-300">
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-6">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary stroke-[3]">
                                <circle cx="35" cy="50" r="25" />
                                <circle cx="65" cy="50" r="25" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-serif text-primary tracking-widest">KNOTENTIALS</h2>
                        <p className="text-neutral/50 text-xs uppercase tracking-[0.4em] mt-2">Wedding Planner</p>
                    </div>
                    <p className="mt-8 text-neutral/50 text-sm">Variation 2: White & Royal Blue</p>
                </div>

                {/* Variation 3: Black & Gold (Luxury) */}
                <div className="card bg-neutral text-neutral-content shadow-xl p-8 flex flex-col items-center justify-center aspect-video">
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-6">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-secondary stroke-[2]">
                                <circle cx="35" cy="50" r="25" />
                                <circle cx="65" cy="50" r="25" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-serif text-secondary tracking-widest">KNOTENTIALS</h2>
                        <p className="text-white/70 text-xs uppercase tracking-[0.4em] mt-2">Wedding Planner</p>
                    </div>
                    <p className="mt-8 text-white/50 text-sm">Variation 3: Black & Gold (Luxury)</p>
                </div>

                {/* Variation 4: Gold & Royal Blue (Bold) */}
                <div className="card bg-secondary text-secondary-content shadow-xl p-8 flex flex-col items-center justify-center aspect-video">
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-6">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary stroke-[3]">
                                <circle cx="35" cy="50" r="25" />
                                <circle cx="65" cy="50" r="25" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-serif text-primary tracking-widest">KNOTENTIALS</h2>
                        <p className="text-primary/80 text-xs uppercase tracking-[0.4em] mt-2">Wedding Planner</p>
                    </div>
                    <p className="mt-8 text-primary/50 text-sm">Variation 4: Gold & Royal Blue</p>
                </div>

            </div>

            <h1 className="text-4xl font-bold text-primary mt-20 mb-4">Login Icon Concepts</h1>
            <p className="text-neutral/70 mb-12">Minimal "Rings + K" - Classic Elegance Palette</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full pb-20">

                {/* Concept A: K inside Rings */}
                <div className="card bg-white shadow-xl p-8 flex flex-col items-center justify-center aspect-square border border-base-300">
                    <div className="relative w-32 h-32 mb-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
                            {/* Rings */}
                            <circle cx="35" cy="50" r="25" className="stroke-primary stroke-[3]" />
                            <circle cx="65" cy="50" r="25" className="stroke-secondary stroke-[3]" />
                            {/* K */}
                            <text x="50" y="65" textAnchor="middle" className="fill-neutral font-serif text-4xl font-bold">K</text>
                        </svg>
                    </div>
                    <p className="mt-4 text-neutral/50 text-sm">Concept A: K inside Rings</p>
                </div>

                {/* Concept B1: Offset Rings */}
                <div className="card bg-white shadow-xl p-8 flex flex-col items-center justify-center aspect-square border border-base-300">
                    <div className="relative w-32 h-32 mb-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-linecap-round">
                            {/* Rings shifted to avoid 8 look */}
                            <circle cx="25" cy="35" r="15" className="stroke-primary stroke-[4]" />
                            <circle cx="35" cy="60" r="15" className="stroke-secondary stroke-[4]" />

                            {/* K legs connecting to the rings */}
                            <path d="M 45 45 L 75 15" className="stroke-neutral stroke-[4]" />
                            <path d="M 45 50 L 75 85" className="stroke-neutral stroke-[4]" />
                        </svg>
                    </div>
                    <p className="mt-4 text-neutral/50 text-sm">Concept B1: Offset Rings</p>
                </div>

                {/* Concept B2: Interlocked Rings (Gap) */}
                <div className="card bg-white shadow-xl p-8 flex flex-col items-center justify-center aspect-square border border-base-300">
                    <div className="relative w-32 h-32 mb-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
                            {/* Top Ring */}
                            <circle cx="30" cy="35" r="16" className="stroke-primary stroke-[4]" />

                            {/* Bottom Ring with mask effect for interlock */}
                            <mask id="mask-ring">
                                <rect x="0" y="0" width="100" height="100" fill="white" />
                                <circle cx="30" cy="35" r="18" stroke="black" strokeWidth="4" fill="none" />
                            </mask>
                            <circle cx="30" cy="60" r="16" className="stroke-secondary stroke-[4]" mask="url(#mask-ring)" />

                            {/* K legs */}
                            <path d="M 45 48 L 75 18" className="stroke-neutral stroke-[4] stroke-linecap-round" />
                            <path d="M 45 48 L 75 82" className="stroke-neutral stroke-[4] stroke-linecap-round" />
                        </svg>
                    </div>
                    <p className="mt-4 text-neutral/50 text-sm">Concept B2: Interlocked Rings</p>
                </div>

                {/* Concept B3: Angled Rings */}
                <div className="card bg-white shadow-xl p-8 flex flex-col items-center justify-center aspect-square border border-base-300">
                    <div className="relative w-32 h-32 mb-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-linecap-round transform -rotate-12">
                            {/* Rings angled */}
                            <circle cx="30" cy="35" r="15" className="stroke-primary stroke-[4]" />
                            <circle cx="30" cy="65" r="15" className="stroke-secondary stroke-[4]" />

                            {/* K legs */}
                            <path d="M 45 50 L 75 20" className="stroke-neutral stroke-[4]" />
                            <path d="M 45 50 L 75 80" className="stroke-neutral stroke-[4]" />
                        </svg>
                    </div>
                    <p className="mt-4 text-neutral/50 text-sm">Concept B3: Angled Rings</p>
                </div>

                {/* Concept C: K with Rings Accent */}
                <div className="card bg-white shadow-xl p-8 flex flex-col items-center justify-center aspect-square border border-base-300">
                    <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                        <span className="text-8xl font-serif font-bold text-primary relative z-10">K</span>
                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-none z-0 opacity-50">
                            <circle cx="60" cy="40" r="20" className="stroke-secondary stroke-[2]" />
                            <circle cx="75" cy="40" r="20" className="stroke-secondary stroke-[2]" />
                        </svg>
                    </div>
                    <p className="mt-4 text-neutral/50 text-sm">Concept C: K with Rings Accent</p>
                </div>

            </div>
        </div>
    );
}
