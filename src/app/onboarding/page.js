"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Onboarding() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        partnerName: "",
        date: "",
        budget: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Save data and redirect
            router.push("/dashboard");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>


                <div className={styles.progress}>
                    <div className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>1</div>
                    <div className={styles.line}></div>
                    <div className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>2</div>
                    <div className={styles.line}></div>
                    <div className={`${styles.step} ${step >= 3 ? styles.active : ""}`}>3</div>
                </div>

                <form onSubmit={handleNext} className={styles.form}>
                    {step === 1 && (
                        <div className={styles.stepContent}>
                            <h2>Who's the lucky partner?</h2>
                            <p>Let's personalize your experience.</p>
                            <div className={styles.inputGroup}>
                                <label htmlFor="partnerName">Partner's Name</label>
                                <input
                                    type="text"
                                    id="partnerName"
                                    value={formData.partnerName}
                                    onChange={handleChange}
                                    placeholder="Enter partner's name"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className={styles.stepContent}>
                            <h2>When is the big day?</h2>
                            <p>We'll help you stay on track.</p>
                            <div className={styles.inputGroup}>
                                <label htmlFor="date">Wedding Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={styles.stepContent}>
                            <h2>What's your budget?</h2>
                            <p>Don't worry, you can change this later.</p>
                            <div className={styles.inputGroup}>
                                <label htmlFor="budget">Total Budget</label>
                                <input
                                    type="number"
                                    id="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    placeholder="25000"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}

                    <button type="submit" className={styles.submitButton}>
                        {step === 3 ? "Finish Setup" : "Next"}
                    </button>
                </form>
            </div>
        </div>
    );
}
