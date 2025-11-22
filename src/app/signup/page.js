"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LogoIcon from "../../components/LogoIcon";
import { createClient } from "../../lib/supabase/client";

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const supabase = createClient();

            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (signUpError) throw signUpError;

            // User is automatically logged in after signup
            // Redirect to onboarding after successful signup
            router.push("/onboarding");
            router.refresh();
        } catch (err) {
            setError(err.message || "An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
            <div className="w-full max-w-sm animate-[slideUp_0.6s_ease-out]">
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <LogoIcon className="w-16 h-16 cursor-pointer" />
                    </Link>
                </div>

                <h1 className="text-center text-3xl font-semibold mb-2 text-base-content sm:text-2xl">Create Account</h1>
                <p className="text-center text-base-content/60 text-sm mb-8">Start planning your dream wedding</p>

                {error && (
                    <div className="alert alert-error mb-6">
                        <span>{error}</span>
                    </div>
                )}

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="form-control w-full">
                        <label htmlFor="name" className="label">
                            <span className="label-text font-medium">Full Name</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your name"
                            required
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label htmlFor="email" className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="your@email.com"
                            required
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label htmlFor="password" className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a password"
                            required
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-base-content/60">
                    Already have an account? <Link href="/login" className="text-primary font-semibold no-underline transition-colors duration-150 hover:text-primary-focus hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
