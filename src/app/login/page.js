import Link from "next/link";
import Image from "next/image";
import icon from "../icon.png";

export default function Login() {
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

                <h1 className="text-center text-3xl font-semibold mb-2 text-base-content sm:text-2xl">Welcome Back</h1>
                <p className="text-center text-base-content/60 text-sm mb-8">Continue planning your perfect wedding</p>

                <form className="flex flex-col gap-6">
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
                        <input type="password" id="password" placeholder="Enter your password" required className="input-enhanced w-full" />
                    </div>

                    <div className="text-right -mt-2">
                        <Link href="/forgot-password" className="text-sm text-primary font-medium no-underline transition-colors duration-150 hover:text-primary-focus hover:underline">Forgot password?</Link>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Log In
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-base-content/60">
                    Don't have an account? <Link href="/signup" className="text-primary font-semibold no-underline transition-colors duration-150 hover:text-primary-focus hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
