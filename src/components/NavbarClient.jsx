"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  BookOpen,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
  Library,
  Info,
  PhoneCall
} from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

const NavbarClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const { data: session } = authClient.useSession();
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(var(--nav-bg-rgb), 0)", "rgba(var(--nav-bg-rgb), 0.85)"]
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(16px)"],
  );
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["1px solid rgba(var(--nav-border-rgb), 0)", "1px solid rgba(var(--nav-border-rgb), 0.1)"]
  );
  const paddingY = useTransform(scrollY, [0, 50], ["1.5rem", "0.75rem"]);

  if (pathName?.includes("dashboard")) return null;

  const user = session?.user;
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "U";

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4 lg:w-[18px] lg:h-[18px]" /> },
    { name: "Browse Books", path: "/books", icon: <Library className="w-4 h-4 lg:w-[18px] lg:h-[18px]" /> },
    { name: "How it Works", path: "/about", icon: <Info className="w-4 h-4 lg:w-[18px] lg:h-[18px]" /> },
    { name: "Contact", path: "/contact", icon: <PhoneCall className="w-4 h-4 lg:w-[18px] lg:h-[18px]" /> },
  ];

  return (
    <>
      <style jsx global>{`
        :root {
          --nav-bg-rgb: 255, 255, 255;
          --nav-border-rgb: 0, 0, 0;
        }
        .dark {
          --nav-bg-rgb: 10, 10, 10;
          --nav-border-rgb: 255, 255, 255;
        }
      `}</style>

      <motion.nav
        style={{
          backgroundColor,
          backdropFilter,
          borderBottom,
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              className="md:hidden text-emerald-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none drop-shadow-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Link
              href="/"
              className="group flex items-center gap-2 lg:gap-3 transition-transform active:scale-95"
            >
              <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-lg lg:rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
                <BookOpen className="text-white w-4 h-4 lg:w-[22px] lg:h-[22px]" />
              </div>
              <p className="font-extrabold text-lg lg:text-xl tracking-tight text-emerald-950 dark:text-white drop-shadow-md transition-colors">
                Biblio<span className="text-emerald-500">Drop</span>
              </p>
            </Link>
          </div>

          <ul className="hidden md:flex items-center gap-3 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathName === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`flex items-center gap-1.5 font-bold drop-shadow-md transition-colors text-xs lg:text-base ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-emerald-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    <span className="scale-90">{link.icon}</span>
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
            <ModeToggle/>

            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              {!user ? (
                <div className="hidden md:flex items-center gap-2 lg:gap-2">
                  <Link
                    href="/signin"
                    className="font-bold text-emerald-900 dark:text-gray-100 hover:text-emerald-600 transition-colors px-1.5 lg:px-4 drop-shadow-md text-xs lg:text-sm"
                  >
                    Sign In
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-all rounded-full h-8 lg:h-10 px-4 lg:px-8 min-w-0 text-xs lg:text-sm border-none">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : (
                <Dropdown>
                  <Dropdown.Trigger className="cursor-pointer rounded-full transition-transform hover:scale-105 drop-shadow-md">
                    <Avatar
                      size="sm"
                      isBordered
                      className="ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#0a0a0a] ring-emerald-500/50 w-7 h-7 lg:w-8 lg:h-8"
                    >
                      <Avatar.Image src={user.image} alt={user.name} />
                      <Avatar.Fallback
                        delayMs={600}
                        className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-500 font-bold text-xs lg:text-sm"
                      >
                        {initials}
                      </Avatar.Fallback>
                    </Avatar>
                  </Dropdown.Trigger>

                  <Dropdown.Popover className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-white/10 shadow-2xl rounded-2xl min-w-60">
                    <div className="px-4 pt-4 pb-2 border-b border-neutral-200 dark:border-white/5">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <Avatar.Image src={user.image} alt={user.name} />
                          <Avatar.Fallback
                            delayMs={600}
                            className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-500 font-bold"
                          >
                            {initials}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm leading-5 font-semibold text-neutral-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs leading-none text-neutral-500 dark:text-neutral-400 truncate w-40">
                            {user.email}
                          </p>
                          <span className="mt-1.5 w-fit rounded-md bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider border border-emerald-200 dark:border-emerald-500/20">
                            {user.role || "USER"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Dropdown.Menu className="p-2">
                      <Dropdown.Item
                        id="dashboard"
                        textValue="Dashboard"
                        href={`/dashboard/${user.role || "user"}`}
                        className="hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors"
                      >
                        <div className="flex w-full items-center justify-between gap-2 py-1">
                          <Label className="cursor-pointer text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Dashboard
                          </Label>
                          <LayoutDashboard className="size-4 text-emerald-600 dark:text-emerald-500" />
                        </div>
                      </Dropdown.Item>

                      <Dropdown.Item
                        id="profile"
                        textValue="Profile"
                        href="/profile"
                        className="hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors"
                      >
                        <div className="flex w-full items-center justify-between gap-2 py-1">
                          <Label className="cursor-pointer text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Profile
                          </Label>
                          <User className="size-4 text-emerald-600 dark:text-emerald-500" />
                        </div>
                      </Dropdown.Item>

                      <Dropdown.Item
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                        onClick={handleSignOut}
                        className="mt-1 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <div className="flex w-full items-center justify-between gap-2 py-1">
                          <Label className="cursor-pointer text-sm font-medium text-red-600 dark:text-red-400">
                            Sign Out
                          </Label>
                          <LogOut className="size-4 text-red-600 dark:text-red-400" />
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[70px] left-0 right-0 z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-neutral-200 dark:border-white/10 md:hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathName === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "text-emerald-900 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}

              <div className="h-px bg-neutral-200 dark:bg-white/10 my-2"></div>

              {!user ? (
                <div className="flex flex-col gap-3 px-2">
                  <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="bordered"
                      className="w-full font-bold border-neutral-300 dark:border-white/20 text-emerald-900 dark:text-white rounded-xl h-12 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-emerald-600 text-white font-bold hover:bg-emerald-500 rounded-xl h-12 border-none">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-2">
                  <Link
                    href={`/dashboard/${user.role || "user"}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-emerald-900 dark:text-neutral-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-emerald-900 dark:text-neutral-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <User size={20} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left w-full"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarClient;