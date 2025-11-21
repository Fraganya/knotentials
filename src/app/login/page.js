import Link from "next/link";
import Image from "next/image";
import icon from "../icon.png";
import styles from "./page.module.css";

export default function Login() {
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

                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Continue planning your perfect wedding</p>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="your@email.com" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>

                    <div className={styles.forgotPassword}>
                        <Link href="/forgot-password">Forgot password?</Link>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Log In
                    </button>
                </form>

                <p className={styles.footer}>
                    Don't have an account? <Link href="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
