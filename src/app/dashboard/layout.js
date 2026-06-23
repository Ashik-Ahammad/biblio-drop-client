import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { getUserSession } from "@/lib/core/session";
import { LayoutDashboard } from "lucide-react";

export default async function DashboardLayout({ children }) {
  const currentUser = await getUserSession();

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-[#050505] overflow-hidden relative transition-colors duration-300">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-400/20 dark:bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none transition-colors duration-300" />

      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="h-16 lg:h-20 border-b border-neutral-200 dark:border-white/10 bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 transition-all duration-300">
          <h1 className="font-bold text-lg md:text-xl text-neutral-900 dark:text-white tracking-wide flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            <LayoutDashboard size={24} /> <span className="uppercase"> Dashboard</span>
          </h1>

          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="hidden sm:flex items-center">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-white/5 px-4 py-1.5 rounded-l-full border border-neutral-200 dark:border-white/10 border-r-0 transition-colors">
                  {currentUser.email}
                </span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-neutral-100 dark:bg-white/5 px-4 py-1.5 rounded-r-full border uppercase select-none border-neutral-200 dark:border-white/10 border-l-0 transition-colors">
                  {currentUser.role}
                </span>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-hide">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}