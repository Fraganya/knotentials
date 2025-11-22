"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LogoIcon from "../../components/LogoIcon";
import { createClient } from "../../lib/supabase/client";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const supabase = createClient();

            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;

            // Redirect to dashboard after successful login
            router.push("/dashboard");
            router.refresh();
        } catch (err) {
            setError(err.message || "An error occurred during login");
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

                <h1 className="text-center text-3xl font-semibold mb-2 text-base-content sm:text-2xl">Welcome Back</h1>
                <p className="text-center text-base-content/60 text-sm mb-8">Continue planning your perfect wedding</p>

                {error && (
                    <div className="alert alert-error mb-6">
                        <span>{error}</span>
                    </div>
                )}

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                            required
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="text-right -mt-2">
                        <Link href="/forgot-password" className="text-sm text-primary font-medium no-underline transition-colors duration-150 hover:text-primary-focus hover:underline">Forgot password?</Link>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-base-content/60">
                    Don't have an account? <Link href="/signup" className="text-primary font-semibold no-underline transition-colors duration-150 hover:text-primary-focus hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
