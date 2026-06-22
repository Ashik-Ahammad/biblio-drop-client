import React from "react";
import { BookOpen } from "lucide-react";

export default function BookDetailsLoading() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white relative overflow-hidden pt-48 pb-12 px-4 md:px-8 font-sans transition-colors duration-300">

      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/10 dark:bg-white/[0.03] blur-[150px] rounded-full pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 dark:bg-white/[0.02] blur-[120px] rounded-full pointer-events-none transition-colors duration-300" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex items-center gap-2 mb-12">
          <div className="h-4 w-12 bg-neutral-200 dark:bg-white/10 animate-pulse rounded transition-colors duration-300" />
          <div className="h-4 w-4 bg-neutral-200/70 dark:bg-white/5 animate-pulse rounded transition-colors duration-300" />
          <div className="h-4 w-20 bg-neutral-200 dark:bg-white/10 animate-pulse rounded transition-colors duration-300" />
          <div className="h-4 w-4 bg-neutral-200/70 dark:bg-white/5 animate-pulse rounded transition-colors duration-300" />
          <div className="h-4 w-32 bg-neutral-300 dark:bg-white/20 animate-pulse rounded transition-colors duration-300" />
        </div>

        <div className="h-10 w-36 bg-neutral-200 dark:bg-white/3 animate-pulse rounded-full border border-neutral-300 dark:border-white/10 mb-10 transition-colors duration-300" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-md aspect-2/3 rounded-3xl overflow-hidden border border-neutral-200 dark:border-white/5 bg-neutral-100 dark:bg-[#0a0a0a] animate-pulse flex items-center justify-center transition-colors duration-300 shadow-xl dark:shadow-none">
              <BookOpen size={64} className="text-neutral-300 dark:text-white/5 transition-colors duration-300" strokeWidth={1} />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col w-full">

            <div className="flex items-center gap-3 mb-6">
              <div className="h-7 w-20 bg-neutral-200 dark:bg-white/10 animate-pulse rounded-full transition-colors duration-300" />
              <div className="h-7 w-32 bg-neutral-200 dark:bg-white/10 animate-pulse rounded-full transition-colors duration-300" />
            </div>

            <div className="h-12 md:h-14 w-3/4 bg-neutral-300 dark:bg-white/20 animate-pulse rounded-xl mb-4 transition-colors duration-300" />
            <div className="h-6 w-1/3 bg-neutral-200 dark:bg-white/10 animate-pulse rounded-md mb-10 transition-colors duration-300" />

            <div className="mb-12">
              <div className="h-4 w-24 bg-neutral-200 dark:bg-white/10 animate-pulse rounded-md mb-6 transition-colors duration-300" />
              <div className="space-y-3">
                <div className="h-3 w-full bg-neutral-200/70 dark:bg-white/5 animate-pulse rounded-sm transition-colors duration-300" />
                <div className="h-3 w-full bg-neutral-200/70 dark:bg-white/5 animate-pulse rounded-sm transition-colors duration-300" />
                <div className="h-3 w-5/6 bg-neutral-200/70 dark:bg-white/5 animate-pulse rounded-sm transition-colors duration-300" />
                <div className="h-3 w-4/5 bg-neutral-200/70 dark:bg-white/5 animate-pulse rounded-sm transition-colors duration-300" />
              </div>
            </div>

            <div className="bg-white dark:bg-white/2 border border-neutral-200 dark:border-white/5 rounded-3xl p-6 md:p-8 mt-auto transition-colors duration-300 shadow-md dark:shadow-none">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-neutral-100 dark:bg-white/10 animate-pulse rounded-full transition-colors duration-300" />
                  <div>
                    <div className="h-3 w-20 bg-neutral-200/70 dark:bg-white/5 animate-pulse rounded-md mb-2 transition-colors duration-300" />
                    <div className="h-8 w-16 bg-neutral-300 dark:bg-white/20 animate-pulse rounded-lg transition-colors duration-300" />
                  </div>
                </div>
                <div className="h-8 w-32 bg-neutral-200 dark:bg-white/5 animate-pulse rounded-full transition-colors duration-300" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-14 bg-neutral-300 dark:bg-white/20 animate-pulse rounded-2xl transition-colors duration-300" />
                <div className="w-full sm:w-48 h-14 bg-neutral-200 dark:bg-white/5 border border-neutral-300 dark:border-white/10 animate-pulse rounded-2xl transition-colors duration-300" />
              </div>
            </div>

          </div>
        </div>

        <div className="mt-32 pt-20 border-t border-neutral-200 dark:border-white/10 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="h-8 w-48 bg-neutral-300 dark:bg-white/20 animate-pulse rounded-xl mb-3 transition-colors duration-300" />
              <div className="h-4 w-64 bg-neutral-200/70 dark:bg-white/5 animate-pulse rounded-md transition-colors duration-300" />
            </div>
            <div className="h-12 w-36 bg-neutral-200 dark:bg-white/10 animate-pulse rounded-xl transition-colors duration-300" />
          </div>

          <div className="h-64 w-full bg-white dark:bg-white/2 border border-neutral-200 dark:border-white/5 animate-pulse rounded-3xl transition-colors duration-300 shadow-md dark:shadow-none" />
        </div>

      </div>
    </main>
  );
}