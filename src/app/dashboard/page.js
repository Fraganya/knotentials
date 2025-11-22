"use client";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
    // Mock data
    const daysToGo = 145;
    const budgetSpent = 12500;
    const budgetTotal = 30000;
    const tasksCompleted = 24;
    const tasksTotal = 86;

    const progress = Math.round((tasksCompleted / tasksTotal) * 100);
    const budgetProgress = Math.round((budgetSpent / budgetTotal) * 100);
    const [partnerName, setPartnerName] = useState("");
    const [partnerAdded, setPartnerAdded] = useState(false);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <header className="flex flex-col items-start gap-4 mb-8 pb-6 border-b border-base-300 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-1">Welcome, Jane & John</h1>
                    <p className="text-lg text-base-content/60">October 15, 2026</p>
                </div>
                <div className="w-full flex justify-between items-center bg-primary text-primary-content px-6 py-4 rounded-xl shadow-md sm:w-auto sm:block sm:text-center">
                    <span className="block text-3xl font-bold leading-none sm:text-4xl">{daysToGo}</span>
                    <span className="text-sm opacity-90">Days to Go</span>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-4">
                {/* Budget Card */}
                <Link href="/budget" className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-serif font-semibold text-lg text-primary-dark">Budget</h3>
                        <span className="text-2xl">💰</span>
                    </div>
                    <div>
                        <div className="text-2xl font-semibold text-base-content mb-2">
                            <span>${budgetSpent.toLocaleString()}</span>
                            <span className="text-base text-base-content/60 font-normal"> / ${budgetTotal.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-base-200 rounded-full overflow-hidden mb-1">
                            <div className="h-full rounded-full transition-all duration-1000 ease-out bg-secondary" style={{ width: `${budgetProgress}%` }}></div>
                        </div>
                        <p className="text-sm text-base-content/60">{budgetProgress}% of budget spent</p>
                    </div>
                </Link>

                {/* Checklist Card */}
                <Link href="/checklist" className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-serif font-semibold text-lg text-primary-dark">Checklist</h3>
                        <span className="text-2xl">✅</span>
                    </div>
                    <div>
                        <div className="text-2xl font-semibold text-base-content mb-2">
                            <span>{tasksCompleted}</span>
                            <span className="text-base text-base-content/60 font-normal"> / {tasksTotal} tasks</span>
                        </div>
                        <div className="h-2 bg-base-200 rounded-full overflow-hidden mb-1">
                            <div className="h-full rounded-full transition-all duration-1000 ease-out bg-primary" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-sm text-base-content/60">{progress}% completed</p>
                    </div>
                </Link>

                {/* Guest List Card */}
                <div className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-serif font-semibold text-lg text-primary-dark">Guests</h3>
                        <span className="text-2xl">👥</span>
                    </div>
                    <div>
                        <div className="text-2xl font-semibold text-base-content mb-2">
                            <span>128</span>
                            <span className="text-base text-base-content/60 font-normal"> invited</span>
                        </div>
                        <div className="flex gap-4 mt-1">
                            <div className="flex items-center gap-2 text-sm text-base-content/60">
                                <span className="w-2 h-2 rounded-full bg-success"></span>
                                85 Yes
                            </div>
                            <div className="flex items-center gap-2 text-sm text-base-content/60">
                                <span className="w-2 h-2 rounded-full bg-warning"></span>
                                12 Pending
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vendors Card */}
                <Link href="/vendors" className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-serif font-semibold text-lg text-primary-dark">Vendors</h3>
                        <span className="text-2xl">🏪</span>
                    </div>
                    <div>
                        <p className="text-sm text-base-content/60">Manage your vendors</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
