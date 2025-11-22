"use client";
import Link from "next/link";
import { useState } from "react";
import Countdown from "../../components/Countdown";

export default function Dashboard() {
    // Mock data
    const budgetSpent = 12500;
    const budgetTotal = 30000;
    const tasksCompleted = 24;
    const tasksTotal = 86;

    const progress = Math.round((tasksCompleted / tasksTotal) * 100);
    const budgetProgress = Math.round((budgetSpent / budgetTotal) * 100);
    const [partnerName, setPartnerName] = useState("");
    const [partnerAdded, setPartnerAdded] = useState(false);

    return (

        <div className="border border-primary border-2 min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/5">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 pb-6 border-b border-base-300">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-primary mb-1">Welcome, Jane & John</h1>
                        <p className="text-lg text-base-content/60">October 15, 2026</p>
                    </div>

                    <div className="flex items-center gap-4 self-start md:self-center">
                        <div className="flex gap-1">
                            <button className="btn btn-circle btn-ghost hover:bg-base-200" aria-label="Settings">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <Link href="/login" className="btn btn-circle btn-ghost hover:bg-base-200" aria-label="Logout">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="mb-12">
                    <Countdown targetDate="2026-10-15T00:00:00" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-4">
                    {/* Budget Card */}
                    <Link href="/budget" className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-sm hover:shadow-lg hover:scale-105 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
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
                    <Link href="/checklist" className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-sm hover:shadow-lg hover:scale-105 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-serif font-semibold text-lg text-primary-dark">A-Z Checklist</h3>
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
                    <div className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-sm">
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
                    <Link href="/vendors" className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-sm hover:shadow-lg hover:scale-105 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-serif font-semibold text-lg text-primary-dark">Vendors</h3>
                            <span className="text-2xl">🏪</span>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/60">Manage your vendors</p>
                        </div>
                    </Link>

                    {/* Ideas Card */}
                    <div className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-sm hover:shadow-lg hover:scale-105 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-serif font-semibold text-lg text-primary-dark">Ideas</h3>
                            <span className="text-2xl">💡</span>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/60">Checkout ideas for your wedding, from fun games, colors, styles</p>
                        </div>
                    </div>

                    {/* More Tools Card */}
                    <div className="card bg-base-100 shadow-sm border border-base-200 p-6 rounded-sm hover:shadow-lg hover:scale-105 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-serif font-semibold text-lg text-primary-dark">More Tools</h3>
                            <span className="text-2xl">🛠️</span>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/60">Wedding site, message book etc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
