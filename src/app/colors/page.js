import React from 'react';

const palettes = [
    {
        name: 'Romantic Garden',
        description: 'Soft & Whimsical',
        colors: [
            { name: 'Lilac', hex: '#C8A2C8' },
            { name: 'Sage Green', hex: '#9DC183' },
            { name: 'Blush Pink', hex: '#FFC0CB' },
            { name: 'Dark Green', hex: '#2F4F4F' },
            { name: 'Soft White', hex: '#F5F5F5' },
        ],
    },
    {
        name: 'Modern Earth',
        description: 'Warm & Boho',
        colors: [
            { name: 'Terracotta', hex: '#E2725B' },
            { name: 'Rust', hex: '#B7410E' },
            { name: 'Ochre', hex: '#CC7722' },
            { name: 'Warm Brown', hex: '#5D4037' },
            { name: 'Cream', hex: '#FFFDD0' },
        ],
    },
    {
        name: 'Classic Elegance',
        description: 'Timeless & Sophisticated',
        colors: [
            { name: 'Royal Blue', hex: '#002366' },
            { name: 'Gold', hex: '#FFD700' },
            { name: 'Silver', hex: '#C0C0C0' },
            { name: 'Black', hex: '#1A1A1A' },
            { name: 'Pure White', hex: '#FFFFFF' },
        ],
    },
    {
        name: 'Vibrant Passion',
        description: 'Bold & Energetic',
        colors: [
            { name: 'Cherry Red', hex: '#D2042D' },
            { name: 'Fuchsia', hex: '#FF00FF' },
            { name: 'Orange', hex: '#FFA500' },
            { name: 'Dark Grey', hex: '#333333' },
            { name: 'White', hex: '#FFFFFF' },
        ],
    },
];

export default function ColorsPage() {
    return (
        <div className="min-h-screen bg-base-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Wedding Color Palettes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {palettes.map((palette) => (
                    <div key={palette.name} className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl">{palette.name}</h2>
                            <p className="text-base-content/70 mb-4">{palette.description}</p>
                            <div className="flex h-32 w-full rounded-lg overflow-hidden mb-4">
                                {palette.colors.map((color) => (
                                    <div
                                        key={color.name}
                                        className="h-full flex-1 flex items-center justify-center group relative"
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs text-center p-1 transition-opacity">
                                            {color.name}
                                            <br />
                                            {color.hex}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-5 gap-2 text-xs text-center">
                                {palette.colors.map((color) => (
                                    <div key={color.name}>
                                        <div className="font-bold">{color.name}</div>
                                        <div className="opacity-70">{color.hex}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
