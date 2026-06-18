"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [count, setCount] = useState(9);

  useEffect(() => {
    if (count <= 0) {
      router.replace("/");
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-xl text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="text-7xl font-black text-indigo-400 animate-pulse">
            4
          </span>

          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-dashed border-amber-400 animate-spin">
            <div className="h-12 w-12 rounded-full bg-amber-400/20 flex items-center justify-center">
              <span className="text-3xl">📚</span>
            </div>
          </div>

          <span className="text-7xl font-black text-indigo-400 animate-pulse">
            4
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white sm:text-5xl">
          Lost in the Library
        </h1>

        <p className="mt-4 text-slate-400">
          The page you are looking for seems to have vanished between the
          bookshelves. You will be redirected to the homepage automatically.
        </p>

        {/* Countdown */}
        <div className="mt-8 flex justify-center">
          <div className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-lg font-semibold text-white shadow-lg">
            Redirecting in <span className="text-amber-400">{count}</span>s
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-indigo-500 active:scale-95"
        >
          ← Go to Home
        </button>
      </div>
    </main>
  );
}
