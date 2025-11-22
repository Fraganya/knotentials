import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: 'rotate(-12deg)',
                    }}
                >
                    {/* Rings angled */}
                    <circle cx="30" cy="35" r="15" stroke="#002366" strokeWidth="4" />
                    <circle cx="30" cy="65" r="15" stroke="#FFD700" strokeWidth="4" />

                    {/* K legs */}
                    <path d="M 45 50 L 75 20" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 45 50 L 75 80" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
