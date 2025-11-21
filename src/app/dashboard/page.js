"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

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
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Welcome, Jane & John</h1>
                    <p className={styles.date}>October 15, 2026</p>
                </div>
                <div className={styles.countdown}>
                    <span className={styles.days}>{daysToGo}</span>
                    <span className={styles.label}>Days to Go</span>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-10 mb-4">
                {/* Budget Card */}
                <Link href="/budget" className="card rounded-sm">
                    <div className={styles.cardHeader}>
                        <h3>Budget</h3>
                        <span className={styles.icon}>💰</span>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.stat}>
                            <span className={styles.currency}>${budgetSpent.toLocaleString()}</span>
                            <span className={styles.total}> / ${budgetTotal.toLocaleString()}</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${budgetProgress}%`, backgroundColor: 'var(--secondary)' }}></div>
                        </div>
                        <p className={styles.subtext}>{budgetProgress}% of budget spent</p>
                    </div>
                </Link>

                {/* Checklist Card */}
                <Link href="/checklist" className="card rounded-sm">
                    <div className={styles.cardHeader}>
                        <h3>Checklist</h3>
                        <span className={styles.icon}>✅</span>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.stat}>
                            <span>{tasksCompleted}</span>
                            <span className={styles.total}> / {tasksTotal} tasks</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${progress}%`, backgroundColor: 'var(--primary)' }}></div>
                        </div>
                        <p className={styles.subtext}>{progress}% completed</p>
                    </div>
                </Link>

                {/* Guest List Card */}
                <div className="card rounded-sm">
                    <div className={styles.cardHeader}>
                        <h3>Guests</h3>
                        <span className={styles.icon}>👥</span>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.stat}>
                            <span>128</span>
                            <span className={styles.total}> invited</span>
                        </div>
                        <div className={styles.guestStats}>
                            <div className={styles.guestStat}>
                                <span className={styles.dot} style={{ background: 'var(--success)' }}></span>
                                85 Yes
                            </div>
                            <div className={styles.guestStat}>
                                <span className={styles.dot} style={{ background: 'var(--warning)' }}></span>
                                12 Pending
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vendors Card */}
                <Link href="/vendors" className="card rounded-sm">
                    <div className={styles.cardHeader}>
                        <h3>Vendors</h3>
                        <span className={styles.icon}>🏪</span>
                    </div>
                    <div className={styles.cardBody}>
                        <p className={styles.subtext}>Manage your vendors</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
