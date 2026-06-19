"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button, Drawer } from "@heroui/react";
import {
  LayoutDashboard,
  History,
  BookMarked,
  Star,
  BookPlus,
  Library,
  Truck,
  ClipboardCheck,
  Users,
  ReceiptText,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  LibraryBig
} from "lucide-react";

const dashboardItems = {
  user: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/user" },
    { icon: History, label: "Delivery History", href: "/dashboard/user/history" },
    { icon: BookMarked, label: "My Reading List", href: "/dashboard/user/reading-list" },
    { icon: Star, label: "My Reviews", href: "/dashboard/user/reviews" },
  ],
  librarian: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/librarian" },
    { icon: BookPlus, label: "Add Book", href: "/dashboard/librarian/add-book" },
    { icon: Library, label: "Manage Inventory", href: "/dashboard/librarian/inventory" },
    { icon: Truck, label: "Manage Deliveries", href: "/dashboard/librarian/deliveries" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
    { icon: ClipboardCheck, label: "Approval Queue", href: "/dashboard/admin/approvals" },
    { icon: Users, label: "Manage Users", href: "/dashboard/admin/manage-users" },
    { icon: LibraryBig, label: "Manage All Books", href: "/dashboard/admin/manage-all-books" },
    { icon: ReceiptText, label: "All Transactions", href: "/dashboard/admin/transactions" },
  ],
};

const NavLinks = ({ navItems, pathname, isCollapsed, isMobile = false }) => (
  <nav className="flex flex-col gap-2 p-3">
    {navItems.map((item) => {
      const isActive = pathname === item.href;
      const Icon = item.icon;

      return (
        <Link
          key={item.label}
          href={item.href}
          title={isCollapsed && !isMobile ? item.label : ""}
          className={`group relative flex items-center rounded-xl p-3.5 transition-all duration-400 overflow-hidden ${
            isActive
              ? "bg-linear-to-r from-emerald-500/10 to-transparent text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] border border-emerald-500/10"
              : "text-neutral-400 hover:bg-white/4 hover:text-white border border-transparent"
          } ${isCollapsed && !isMobile ? "justify-center" : "justify-start gap-4"}`}
        >
          {isActive && (
            <span className="absolute left-0 top-1/2 h-full w-1 -translate-y-1/2 rounded-r-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
          )}

          <Icon
            className={`shrink-0 transition-all duration-400 ${
              isActive ? "scale-100 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "group-hover:scale-110"
            }`}
            size={22}
            strokeWidth={isActive ? 2.5 : 2}
          />

          {(!isCollapsed || isMobile) && (
            <span className={`text-sm tracking-wide whitespace-nowrap transition-all duration-300 ${isActive ? "font-bold" : "font-medium"}`}>
              {item.label}
            </span>
          )}
        </Link>
      );
    })}
  </nav>
);

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const navItems = dashboardItems[user?.role] || [];

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <>
      <aside
        className={`hidden md:flex flex-col h-[calc(100vh-2rem)] m-4 rounded-[2rem] bg-white/2 backdrop-blur-3xl border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out relative z-40 ${
          isCollapsed ? "w-24" : "w-72"
        }`}
      >
        <div className="absolute inset-0 bg-linear-to-b from-emerald-500/5 to-transparent rounded-[2rem] pointer-events-none opacity-50" />

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-12 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-[#0a0a0a] border border-white/10 shadow-2xl text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300 focus:outline-none"
        >
          {isCollapsed ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronLeft size={16} strokeWidth={3} />}
        </button>

        <div className={`h-28 flex items-center px-6 transition-all duration-300 border-b border-white/5 relative ${isCollapsed ? "justify-center px-0" : ""}`}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-white shrink-0 transition-all duration-400 group-hover:scale-105 group-hover:rotate-6 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              <BookOpen size={22} strokeWidth={2.5} />
            </div>
            {!isCollapsed && (
              <h2 className="text-2xl font-black text-white whitespace-nowrap tracking-tight">
                Biblio<span className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">Drop</span>
              </h2>
            )}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-6 relative z-10">
          <NavLinks navItems={navItems} pathname={pathname} isCollapsed={isCollapsed} />
        </div>

        <div className="p-4 border-t border-white/5 m-3 mt-auto flex flex-col gap-4 relative z-10 bg-white/1 rounded-2xl">
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
            <div className="h-11 w-11 rounded-full bg-[#0a0a0a] shrink-0 border border-emerald-500/40 flex items-center justify-center overflow-hidden relative shadow-[0_0_15px_rgba(16,185,129,0.15)] group">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="44px"
                />
              ) : (
                <span className="text-base font-black text-emerald-500">
                  {user?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-white truncate drop-shadow-md">
                  {user?.name || "User"}
                </span>
                <span className="text-[10px] text-emerald-400 uppercase font-black tracking-[0.15em] opacity-80">
                  {user?.role || "Guest"}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleSignOut}
            title={isCollapsed ? "Sign Out" : ""}
            className={`flex items-center rounded-xl p-3 transition-all duration-300 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 hover:shadow-[inset_0_0_15px_rgba(239,68,68,0.1)] border border-transparent hover:border-red-500/20 ${
              isCollapsed ? "justify-center" : "justify-start gap-3"
            }`}
          >
            <LogOut size={20} strokeWidth={2.5} className="shrink-0 transition-transform group-hover:-translate-x-1" />
            {!isCollapsed && <span className="text-sm font-bold whitespace-nowrap">Sign Out</span>}
          </button>
        </div>
      </aside>

      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Drawer>
          <Button
            isIconOnly
            radius="full"
            className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_8px_30px_rgba(16,185,129,0.4)] border-none transition-transform hover:scale-105"
            aria-label="Open Menu"
          >
            <Menu size={24} strokeWidth={2.5} />
          </Button>

          <Drawer.Backdrop className="bg-[#050505]/80 backdrop-blur-md">
            <Drawer.Content
              placement="left"
              className="bg-[#0a0a0a]/95 backdrop-blur-3xl border-r border-white/5 max-w-70"
            >
              <Drawer.Dialog>
                <Drawer.CloseTrigger className="mt-4 mr-4 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors rounded-full" />
                <Drawer.Header className="pb-6 pt-10 border-b border-white/5">
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <BookOpen size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      Biblio<span className="text-emerald-500">Drop</span>
                    </h2>
                  </div>
                </Drawer.Header>
                <Drawer.Body className="px-2 py-6 flex flex-col justify-between">
                  <div>
                    <NavLinks
                      navItems={navItems}
                      pathname={pathname}
                      isCollapsed={false}
                      isMobile={true}
                    />
                  </div>

                  <div className="mt-auto px-3 py-4">
                    <Button
                      onClick={handleSignOut}
                      className="w-full flex items-center hover:cursor-pointer justify-center gap-3 rounded-xl p-6 bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-all border border-red-500/10 hover:border-red-500/30"
                    >
                      <LogOut size={20} strokeWidth={2.5} />
                      Sign Out
                    </Button>
                  </div>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
};

export default DashboardSidebar;