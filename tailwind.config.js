/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            "light",
            "dark",
            "cupcake", // built-in example themes
            "valentine",
            "lofi",
            {
                weddingTheme: {
                    "primary": "#8b5cf6",
                    "secondary": "#f9a8d4",
                    "accent": "#86efac",
                    "neutral": "#2a323c",
                    "base-100": "#ffffff",
                    "info": "#93c5fd",
                    "success": "#4ade80",
                    "warning": "#fbbf24",
                    "error": "#f87171",
                },
            },
        ],
    },
};