'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { FiLayout } from 'react-icons/fi'; // Used layout icon as requested

export default function DashboardLayout({
  children,
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  // Route Protection: Redirect if unauthenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/signin');
    }
  }, [session, isPending, router]);

  // Loading State while checking session
  if (isPending || !session?.user) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#F8FAFC] dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#0D9488]/20 border-t-[#0D9488] rounded-full animate-spin" />
          <p className="text-[#475569] dark:text-neutral-400 font-bold animate-pulse">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const userRole = session.user.role || 'tourist';

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] dark:bg-[#050505] flex relative transition-colors duration-300 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Mobile Floating Action Button (FAB) for Sidebar */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
          <SheetTrigger asChild>
            <button className="w-14 h-14 bg-[#0F172A] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#0F172A]/30 hover:bg-[#1E293B] active:scale-95 transition-all outline-none border-2 border-white/10">
              <FiLayout className="text-2xl" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px] bg-[#F8FAFC] dark:bg-[#050505] border-r-slate-200 dark:border-white/10">
            {/* Required by Radix for accessibility */}
            <SheetTitle className="sr-only">Dashboard Navigation Menu</SheetTitle>

            {/* Sidebar Component with auto-close capability */}
            <DashboardSidebar
              role={userRole}
              onLinkClick={() => setIsMobileSheetOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <DashboardSidebar role={userRole} />

      {/* Main Dashboard Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="md:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold text-xs uppercase">
              {userRole.charAt(0)}
            </div>
            <span className="font-extrabold text-[#0F172A] dark:text-white capitalize">{userRole} Dashboard</span>
          </div>

          {children}
        </div>
      </main>

    </div>
  );
}