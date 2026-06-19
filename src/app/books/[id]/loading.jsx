import React from "react";
import { BookOpen } from "lucide-react";

export default function BookDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#000000] text-white relative overflow-hidden pt-48 pb-12 px-4 md:px-8 font-sans">

      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-white/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex items-center gap-2 mb-12">
          <div className="h-4 w-12 bg-white/10 animate-pulse rounded" />
          <div className="h-4 w-4 bg-white/5 animate-pulse rounded" />
          <div className="h-4 w-20 bg-white/10 animate-pulse rounded" />
          <div className="h-4 w-4 bg-white/5 animate-pulse rounded" />
          <div className="h-4 w-32 bg-white/20 animate-pulse rounded" />
        </div>

        <div className="h-10 w-36 bg-white/3 animate-pulse rounded-full border border-white/10 mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-md aspect-2/3 rounded-3xl overflow-hidden border border-white/5 bg-[#0a0a0a] animate-pulse flex items-center justify-center">
              <BookOpen size={64} className="text-white/5" strokeWidth={1} />
            </div>
          </div>

          {/* Right Column: Details & Actions Skeleton */}
          <div className="lg:col-span-7 flex flex-col w-full">

            {/* Badges Skeleton */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-7 w-20 bg-white/10 animate-pulse rounded-full" />
              <div className="h-7 w-32 bg-white/10 animate-pulse rounded-full" />
            </div>

            {/* Title & Author Skeleton */}
            <div className="h-12 md:h-14 w-3/4 bg-white/20 animate-pulse rounded-xl mb-4" />
            <div className="h-6 w-1/3 bg-white/10 animate-pulse rounded-md mb-10" />

            {/* Synopsis Skeleton */}
            <div className="mb-12">
              <div className="h-4 w-24 bg-white/10 animate-pulse rounded-md mb-6" />
              <div className="space-y-3">
                <div className="h-3 w-full bg-white/5 animate-pulse rounded-sm" />
                <div className="h-3 w-full bg-white/5 animate-pulse rounded-sm" />
                <div className="h-3 w-5/6 bg-white/5 animate-pulse rounded-sm" />
                <div className="h-3 w-4/5 bg-white/5 animate-pulse rounded-sm" />
              </div>
            </div>

            {/* Action Card (Glass Checkout Strip) Skeleton */}
            <div className="bg-white/2 border border-white/5 rounded-3xl p-6 md:p-8 mt-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  {/* Truck Icon Circle */}
                  <div className="w-14 h-14 bg-white/10 animate-pulse rounded-full" />
                  <div>
                    <div className="h-3 w-20 bg-white/5 animate-pulse rounded-md mb-2" />
                    <div className="h-8 w-16 bg-white/20 animate-pulse rounded-lg" />
                  </div>
                </div>
                {/* Secure Checkout Badge */}
                <div className="h-8 w-32 bg-white/5 animate-pulse rounded-full" />
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-14 bg-white/20 animate-pulse rounded-2xl" />
                <div className="w-full sm:w-48 h-14 bg-white/5 border border-white/10 animate-pulse rounded-2xl" />
              </div>
            </div>

          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className="mt-32 pt-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="h-8 w-48 bg-white/20 animate-pulse rounded-xl mb-3" />
              <div className="h-4 w-64 bg-white/5 animate-pulse rounded-md" />
            </div>
            <div className="h-12 w-36 bg-white/10 animate-pulse rounded-xl" />
          </div>


          <div className="h-64 w-full bg-white/2 border border-white/5 animate-pulse rounded-3xl" />
        </div>

      </div>
    </main>
  );
}