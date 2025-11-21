import Link from "next/link";
import Image from "next/image";
import icon from "./icon.png";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.logoContainer}>
            <Image 
              src={icon} 
              alt="Knotentials Logo" 
              width={80} 
              height={80} 
              className={styles.logo}
              priority
            />
          </div>
          <h1 className={styles.title}>
            Knotentials
          </h1>
          <p className={styles.subtitle}>
            Plan Your Perfect Wedding
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/signup" className="btn btn-primary">
              Start Planning
            </Link>
            <Link href="/login" className="btn btn-outline">
              Log In
            </Link>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.featureItem}>
            <h3>Budget</h3>
          </div>
          <div className={styles.separator}>•</div>
          <div className={styles.featureItem}>
            <h3>Checklist</h3>
          </div>
          <div className={styles.separator}>•</div>
          <div className={styles.featureItem}>
            <h3>Guests</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
