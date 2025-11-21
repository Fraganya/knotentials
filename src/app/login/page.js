import Link from "next/link";
import styles from "./page.module.css";

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.glassCard}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Continue planning your big day</p>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="jane@example.com" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="btn btn-primary">
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
