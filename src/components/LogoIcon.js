import React from 'react';

export default function LogoIcon({ className = "w-12 h-12" }) {
    return (
        <svg
            viewBox="0 0 100 100"
            className={`${className} fill-none stroke-linecap-round -rotate-12`}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Rings angled */}
            <circle cx="30" cy="35" r="15" className="stroke-primary stroke-[4]" />
            <circle cx="30" cy="65" r="15" className="stroke-secondary stroke-[4]" />

            {/* K legs */}
            <path d="M 45 50 L 75 20" className="stroke-neutral stroke-[4]" />
            <path d="M 45 50 L 75 80" className="stroke-neutral stroke-[4]" />
        </svg>
    );
}
