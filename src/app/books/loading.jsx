import React from "react";
import { BookOpen } from "lucide-react";

export default function BooksLoading() {
  return (
    <section className="min-h-screen py-24 px-4 md:px-8 w-full bg-neutral-50 dark:bg-[#050505] transition-colors duration-300 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-500/10 dark:bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-emerald-500/10 dark:bg-emerald-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-neutral-200 dark:border-white/5 transition-colors duration-300 pb-8">
          <div className="w-full">
            <div className="h-12 w-64 md:w-80 bg-neutral-200 dark:bg-white/10 transition-colors duration-300 animate-pulse rounded-xl mb-4" />
            <div className="h-6 w-48 md:w-96 bg-neutral-200/70 dark:bg-white/5 transition-colors duration-300 animate-pulse rounded-lg" />
          </div>

          <div className="h-12 w-full md:w-64 bg-neutral-200/70 dark:bg-white/5 transition-colors duration-300 animate-pulse rounded-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/5 transition-colors duration-300 rounded-[2rem] overflow-hidden shadow-xl dark:shadow-2xl"
            >

              <div className="w-full h-64 bg-neutral-100 dark:bg-white/[0.03] transition-colors duration-300 animate-pulse relative flex items-center justify-center">
                <BookOpen size={48} className="text-neutral-300 dark:text-white/10 transition-colors duration-300" strokeWidth={1.5} />

                <div className="absolute top-4 left-4 h-6 w-20 bg-neutral-200 dark:bg-white/10 transition-colors duration-300 rounded-full" />
              </div>

              <div className="p-8 flex flex-col grow">

                <div className="flex flex-col gap-3 mb-4">
                  <div className="h-7 w-full bg-neutral-200 dark:bg-white/10 transition-colors duration-300 animate-pulse rounded-lg" />
                  <div className="h-7 w-2/3 bg-neutral-200 dark:bg-white/10 transition-colors duration-300 animate-pulse rounded-lg" />
                </div>

                <div className="h-5 w-1/2 bg-neutral-200/70 dark:bg-white/5 transition-colors duration-300 animate-pulse rounded-md mb-8" />

                <div className="flex flex-col gap-2.5 mb-8 grow">
                  <div className="h-3 w-full bg-neutral-200/70 dark:bg-white/5 transition-colors duration-300 animate-pulse rounded-md" />
                  <div className="h-3 w-full bg-neutral-200/70 dark:bg-white/5 transition-colors duration-300 animate-pulse rounded-md" />
                  <div className="h-3 w-3/4 bg-neutral-200/70 dark:bg-white/5 transition-colors duration-300 animate-pulse rounded-md" />
                </div>

                <div className="flex items-center justify-between border-t border-neutral-200 dark:border-white/5 transition-colors duration-300 pt-6 mt-auto">

                  <div className="h-6 w-16 bg-neutral-200 dark:bg-white/10 transition-colors duration-300 animate-pulse rounded-md" />

                  <div className="h-10 w-28 bg-neutral-200 dark:bg-white/10 transition-colors duration-300 animate-pulse rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}