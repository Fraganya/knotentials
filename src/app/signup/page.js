"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import icon from "../icon.png";

export default function Signup() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, we would send data to API here
        router.push("/onboarding");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
            <div className="w-full max-w-md animate-[slideUp_0.6s_ease-out]">
                <div className="flex justify-center mb-8">
                    <Image
                        src={icon}
                        alt="Knotentials Logo"
                        width={60}
                        height={60}
                        className="opacity-90"
                        priority
                    />
                </div>

                <h1 className="text-center text-3xl font-semibold mb-2 text-base-content sm:text-2xl">Create Account</h1>
                <p className="text-center text-base-content/60 text-sm mb-8">Start planning your dream wedding</p>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="form-control w-full">
                        <label htmlFor="name" className="label">
                            <span className="label-text font-medium">Full Name</span>
                        </label>
                        <input type="text" id="name" placeholder="Your name" required className="input-enhanced w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label htmlFor="email" className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <input type="email" id="email" placeholder="your@email.com" required className="input-enhanced w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label htmlFor="password" className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <input type="password" id="password" placeholder="Create a password" required className="input-enhanced w-full" />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Sign Up
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-base-content/60">
                    Already have an account? <Link href="/login" className="text-primary font-semibold no-underline transition-colors duration-150 hover:text-primary-focus hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
