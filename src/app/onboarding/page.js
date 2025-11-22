"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
            <div className="w-full max-w-lg animate-[slideUp_0.6s_ease-out]">


                <ul className="steps-enhanced mb-8">
                    <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Partner</li>
                    <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Date</li>
                    <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Budget</li>
                </ul>

                <form onSubmit={handleNext} className="flex flex-col gap-8">
                    {step === 1 && (
                        <div className="text-center animate-[fadeIn_0.4s_ease-out]">
                            <h2 className="text-2xl font-semibold mb-2 text-base-content sm:text-2xl">Who's the lucky partner?</h2>
                            <p className="text-base-content/60 text-sm mb-6">Let's personalize your experience.</p>
                            <div className="form-control w-full">
                                <label htmlFor="partnerName" className="label">
                                    <span className="label-text font-medium">Partner's Name</span>
                                </label>
                                <input
                                    type="text"
                                    id="partnerName"
                                    value={formData.partnerName}
                                    onChange={handleChange}
                                    placeholder="Enter partner's name"
                                    required
                                    autoFocus
                                    className="input-enhanced w-full"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center animate-[fadeIn_0.4s_ease-out]">
                            <h2 className="text-2xl font-semibold mb-2 text-base-content sm:text-2xl">When is the big day?</h2>
                            <p className="text-base-content/60 text-sm mb-6">We'll help you stay on track.</p>
                            <div className="form-control w-full">
                                <label htmlFor="date" className="label">
                                    <span className="label-text font-medium">Wedding Date</span>
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                    className="input-enhanced w-full"
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center animate-[fadeIn_0.4s_ease-out]">
                            <h2 className="text-2xl font-semibold mb-2 text-base-content sm:text-2xl">What's your budget?</h2>
                            <p className="text-base-content/60 text-sm mb-6">Don't worry, you can change this later.</p>
                            <div className="form-control w-full">
                                <label htmlFor="budget" className="label">
                                    <span className="label-text font-medium">Total Budget</span>
                                </label>
                                <input
                                    type="number"
                                    id="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    placeholder="25000"
                                    required
                                    autoFocus
                                    className="input-enhanced w-full"
                                />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary w-full">
                        {step === 3 ? "Finish Setup" : "Next"}
                    </button>
                </form>
            </div>
        </div>
    );
}
