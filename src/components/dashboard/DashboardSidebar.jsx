"use client";
import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import {
  LayoutDashboard,
  History,
  BookMarked,
  Star,
  BookPlus,
  Library,
  Truck,
  CheckCircle,
  Users,
  Receipt,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

const dashboardItems = {
  user: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/user" },
    {
      icon: History,
      label: "Delivery History",
      href: "/dashboard/user/history",
    },
    {
      icon: BookMarked,
      label: "My Reading List",
      href: "/dashboard/user/reading-list",
    },
    { icon: Star, label: "My Reviews", href: "/dashboard/user/reviews" },
  ],
  librarian: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/librarian" },
    {
      icon: BookPlus,
      label: "Add Book",
      href: "/dashboard/librarian/add-book",
    },
    {
      icon: Library,
      label: "Manage Inventory",
      href: "/dashboard/librarian/inventory",
    },
    {
      icon: Truck,
      label: "Manage Deliveries",
      href: "/dashboard/librarian/deliveries",
    },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
    {
      icon: CheckCircle,
      label: "Approval Queue",
      href: "/dashboard/admin/approvals",
    },
    { icon: Users, label: "Manage Users", href: "/dashboard/admin/users" },
    {
      icon: Library,
      label: "Manage All Books",
      href: "/dashboard/admin/books",
    },
    {
      icon: Receipt,
      label: "All Transactions",
      href: "/dashboard/admin/transactions",
    },
  ],
};

const NavLinks = ({ navItems, pathname, isCollapsed, isMobile = false }) => (
  <nav className="flex flex-col gap-1.5 p-3">
    {navItems.map((item) => {
      const isActive = pathname === item.href;
      const Icon = item.icon;

      return (
        <Link
          key={item.label}
          href={item.href}
          title={isCollapsed && !isMobile ? item.label : ""}
          className={`group relative flex items-center rounded-xl p-3 transition-all duration-300 ${
            isActive
              ? "bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]"
              : "text-neutral-400 hover:bg-white/5 hover:text-white"
          } ${isCollapsed && !isMobile ? "justify-center" : "justify-start gap-4"}`}
        >
          {isActive && (
            <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          )}

          <Icon
            className={`shrink-0 transition-transform duration-300 ${
              isActive ? "scale-100" : "group-hover:scale-110"
            }`}
            size={22}
          />

          {(!isCollapsed || isMobile) && (
            <span className="text-sm font-medium tracking-wide whitespace-nowrap">
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
        className={`hidden md:flex flex-col h-[calc(100vh-2rem)] m-4 rounded-3xl bg-white/3 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-all duration-400 ease-in-out relative z-40 ${
          isCollapsed ? "w-24" : "w-72"
        }`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-10 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-[#121212] border border-white/10 shadow-xl text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors focus:outline-none"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <div
          className={`h-24 flex items-center px-6 transition-all duration-300 border-b border-white/5 ${isCollapsed ? "justify-center px-0" : ""}`}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/20 text-white shrink-0 transition-transform group-hover:scale-105 group-hover:rotate-3">
              <BookOpen size={20} />
            </div>
            {!isCollapsed && (
              <h2 className="text-xl font-extrabold text-white whitespace-nowrap">
                Biblio<span className="text-emerald-500">Drop</span>
              </h2>
            )}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-4">
          <NavLinks
            navItems={navItems}
            pathname={pathname}
            isCollapsed={isCollapsed}
          />
        </div>

        <div className="p-4 border-t border-white/5 m-2 mt-auto flex flex-col gap-3">
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}
          >
            <div className="h-10 w-10 rounded-full bg-neutral-800 shrink-0 border border-emerald-500/30 flex items-center justify-center overflow-hidden relative">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="User Profile"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <span className="text-sm font-bold text-emerald-500">
                  {user?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-white truncate">
                  {user?.name || "User"}
                </span>
                <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">
                  {user?.role || "Guest"}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleSignOut}
            title={isCollapsed ? "Logout" : ""}
            className={`flex items-center rounded-xl p-2.5 transition-all duration-300 text-red-400 hover:bg-red-500/10 ${
              isCollapsed
                ? "justify-center"
                : "justify-start gap-3 hover:cursor-pointer"
            }`}
          >
            <LogOut size={22} className="shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-semibold whitespace-nowrap">
                Sign Out
              </span>
            )}
          </button>
        </div>
      </aside>

      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Drawer>
          <Button
            isIconOnly
            radius="full"
            className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_8px_30px_rgba(16,185,129,0.3)] border-none"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </Button>

          <Drawer.Backdrop className="bg-black/60 backdrop-blur-sm">
            <Drawer.Content
              placement="left"
              className="bg-white/3 backdrop-blur-3xl border-r border-white/10 max-w-70"
            >
              <Drawer.Dialog>
                <Drawer.CloseTrigger className="mt-3 mr-3 bg-white/5 hover:bg-white/10 text-white" />
                <Drawer.Header className="pb-4 pt-8 border-b border-white/5">
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white shadow-lg">
                      <BookOpen size={20} />
                    </div>
                    <h2 className="text-xl font-extrabold text-white">
                      Biblio<span className="text-emerald-500">Drop</span>
                    </h2>
                  </div>
                </Drawer.Header>
                <Drawer.Body className="px-2 py-4 flex flex-col justify-between">
                  <div>
                    <NavLinks
                      navItems={navItems}
                      pathname={pathname}
                      isCollapsed={false}
                      isMobile={true}
                    />
                  </div>

                  <div className="mt-auto px-3 py-4 border-t border-white/5">
                    <Button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center gap-3 rounded-xl p-3 bg-red-500/10 text-red-400 font-semibold hover:bg-red-500/20 transition-all hover:cursor-pointer"
                    >
                      <LogOut size={20} />
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
