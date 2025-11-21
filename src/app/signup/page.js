"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import icon from "../icon.png";
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
            <div className={styles.formWrapper}>
                <div className={styles.logoContainer}>
                    <Image
                        src={icon}
                        alt="Knotentials Logo"
                        width={60}
                        height={60}
                        className={styles.logo}
                        priority
                    />
                </div>

                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Start planning your dream wedding</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="Your name" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="your@email.com" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Create a password" required />
                    </div>

                    <button type="submit" className={styles.submitButton}>
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
