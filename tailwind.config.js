/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                weddingTheme: {
                    "primary": "#002366",
                    "secondary": "#FFD700",
                    "accent": "#C0C0C0",
                    "neutral": "#1A1A1A",
                    "base-100": "#FFFFFF",
                    "info": "#93c5fd",
                    "success": "#4ade80",
                    "warning": "#fbbf24",
                    "error": "#f87171",
                },
            },
        ],
    },
};