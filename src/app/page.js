import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Plan Your <span className={styles.highlight}>Perfect</span> Wedding
          </h1>
          <p className={styles.subtitle}>
            From "Yes" to "I Do", Knotentials guides you through every step of your journey.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/signup" className="btn btn-primary">
              Start Planning Free
            </Link>
            <Link href="/login" className="btn btn-outline">
              Log In
            </Link>
          </div>
        </div>

        <div className={styles.features}>
          <div className="card">
            <h3>Budget Planner</h3>
            <p>Track every penny with our intuitive budget management tool.</p>
          </div>
          <div className="card">
            <h3>A-Z Checklist</h3>
            <p>Never miss a detail with our comprehensive wedding checklist.</p>
          </div>
          <div className="card">
            <h3>Guest List</h3>
            <p>Manage your guest list and RSVPs in one beautiful place.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
