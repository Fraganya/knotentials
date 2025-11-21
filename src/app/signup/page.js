"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Signup() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, we would send data to API here
        router.push("/onboarding");
    };

    return (
        <div className={styles.container}>
            <div className={styles.glassCard}>
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Start planning your dream wedding</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="Jane Doe" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="jane@example.com" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>

                <p className={styles.footer}>
                    Already have an account? <Link href="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}
