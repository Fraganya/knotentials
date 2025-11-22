import Link from "next/link";
import Image from "next/image";
import icon from "./icon.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <main className="w-full max-w-4xl px-4 py-12 flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center w-full animate-[fadeIn_1s_ease-out]">
          <div className="mb-6 relative">
            <Image
              src={icon}
              alt="Knotentials Logo"
              width={80}
              height={80}
              className="rounded-lg shadow-md"
              priority
            />
          </div>
          <h1 className="text-6xl mb-2 tracking-tighter text-primary font-medium sm:text-5xl">
            Knotentials
          </h1>
          <p className="text-xl text-base-content/70 mb-8 font-light tracking-wide">
            Plan Your Perfect Wedding
          </p>

          <div className="flex gap-4 justify-center w-full">
            <Link href="/signup" className="btn btn-primary">
              Start Planning
            </Link>
            <Link href="/login" className="btn btn-outline">
              Log In
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 text-base-content/50 text-sm uppercase tracking-widest sm:gap-4 sm:text-xs">
          <div className="font-medium font-sans">
            <h3>Budget</h3>
          </div>
          <div className="text-primary/50">•</div>
          <div className="font-medium font-sans">
            <h3>Checklist</h3>
          </div>
          <div className="text-primary/50">•</div>
          <div className="font-medium font-sans">
            <h3>Guests</h3>
          </div>
          <div className="text-primary/50">•</div>
          <div className="font-medium font-sans">
            <h3>Ideas</h3>
          </div>
          <div className="text-primary/50">•</div>
          <div className="font-medium font-sans">
            <h3>Vendors</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
