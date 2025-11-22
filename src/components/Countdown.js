"use client";
import { useState, useEffect } from "react";

export default function Countdown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            let newTimeLeft = {};

            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            } else {
                newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            setTimeLeft(newTimeLeft);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex flex-col items-start gap-4">
            <span className="text-sm font-medium uppercase tracking-widest text-base-content/60">Counting Down</span>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-3 bg-base-100 rounded-box text-primary shadow-sm border border-base-200 min-w-[80px]">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": timeLeft.days }}></span>
                    </span>
                    <span className="text-xs uppercase tracking-wide mt-1 text-base-content/60">days</span>
                </div>
                <div className="flex flex-col p-3 bg-base-100 rounded-box text-primary shadow-sm border border-base-200 min-w-[80px]">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": timeLeft.hours }}></span>
                    </span>
                    <span className="text-xs uppercase tracking-wide mt-1 text-base-content/60">hours</span>
                </div>
                <div className="flex flex-col p-3 bg-base-100 rounded-box text-primary shadow-sm border border-base-200 min-w-[80px]">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": timeLeft.minutes }}></span>
                    </span>
                    <span className="text-xs uppercase tracking-wide mt-1 text-base-content/60">min</span>
                </div>
                <div className="flex flex-col p-3 bg-base-100 rounded-box text-primary shadow-sm border border-base-200 min-w-[80px]">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": timeLeft.seconds }}></span>
                    </span>
                    <span className="text-xs uppercase tracking-wide mt-1 text-base-content/60">sec</span>
                </div>
            </div>
        </div>
    );
}
