"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BookOpen, Home, LayoutDashboard, LogOut, Menu, User, X, Library } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle"; // ModeToggle ইম্পোর্ট করা হলো

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const { data: session } = authClient.useSession();
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"]);
  const backdropFilter = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(16px)"]);
  const borderBottom = useTransform(scrollY, [0, 50], ["1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0.08)"]);
  const paddingY = useTransform(scrollY, [0, 50], ["1.5rem", "0.75rem"]);

  if (pathName?.includes("dashboard")) return null;

  const user = session?.user;
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() || "U";

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Browse Books", path: "/books", icon: <Library size={18} /> },
  ];

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter, borderBottom, paddingTop: paddingY, paddingBottom: paddingY }}
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Left Side: Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-300 hover:text-emerald-400 transition-colors focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Link href="/" className="group flex items-center gap-3 transition-transform active:scale-95">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
                <BookOpen className="text-white" size={22} />
              </div>
              <p className="font-extrabold text-xl tracking-tight text-white">
                Biblio<span className="text-emerald-500">Drop</span>
              </p>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathName === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`flex items-center gap-2 font-medium transition-colors ${
                      isActive ? "text-emerald-500" : "text-gray-300 hover:text-emerald-400"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>


          <div className="flex items-center gap-3 md:gap-4">

            {/* ModeToggle */}
            <ModeToggle />

           
            <div className="hidden md:flex items-center gap-4">
              {!user ? (
                <>
                  <Link href="/signin" className="font-medium text-gray-300 hover:text-emerald-400 transition-colors px-4">
                    Sign In
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 transition-all rounded-full px-8 py-2 border-none">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <Dropdown>
                  <Dropdown.Trigger className="cursor-pointer rounded-full transition-transform hover:scale-105">
                    <Avatar size="sm" isBordered className="ring-2 ring-offset-2 ring-offset-[#0a0a0a] ring-emerald-500/50">
                      <Avatar.Image src={user.image} alt={user.name} />
                      <Avatar.Fallback delayMs={600} className="bg-emerald-900/50 text-emerald-500 font-bold">{initials}</Avatar.Fallback>
                    </Avatar>
                  </Dropdown.Trigger>

                  <Dropdown.Popover className="bg-[#121212] border border-white/10 text-white shadow-2xl rounded-2xl min-w-[240px]">
                    <div className="px-4 pt-4 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <Avatar.Image src={user.image} alt={user.name} />
                          <Avatar.Fallback delayMs={600} className="bg-emerald-900/50 text-emerald-500 font-bold">{initials}</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm leading-5 font-semibold text-white">{user.name}</p>
                          <p className="text-xs leading-none text-neutral-400 truncate w-40">{user.email}</p>
                          <span className="mt-1.5 w-fit rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500 uppercase tracking-wider border border-emerald-500/20">
                            {user.role || "USER"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Dropdown.Menu className="p-2">
                      <Dropdown.Item id="dashboard" textValue="Dashboard" href={`/dashboard/${user.role || 'user'}`} className="hover:bg-emerald-500/10 rounded-xl transition-colors">
                        <div className="flex w-full items-center justify-between gap-2 py-1">
                          <Label className="cursor-pointer text-sm font-medium text-neutral-300">Dashboard</Label>
                          <LayoutDashboard className="size-4 text-emerald-500" />
                        </div>
                      </Dropdown.Item>

                      <Dropdown.Item id="profile" textValue="Profile" href="/profile" className="hover:bg-emerald-500/10 rounded-xl transition-colors">
                        <div className="flex w-full items-center justify-between gap-2 py-1">
                          <Label className="cursor-pointer text-sm font-medium text-neutral-300">Profile</Label>
                          <User className="size-4 text-emerald-500" />
                        </div>
                      </Dropdown.Item>

                      <Dropdown.Item id="logout" textValue="Logout" variant="danger" onClick={handleSignOut} className="mt-1 hover:bg-red-500/10 rounded-xl transition-colors">
                        <div className="flex w-full items-center justify-between gap-2 py-1">
                          <Label className="cursor-pointer text-sm font-medium text-red-400">Sign Out</Label>
                          <LogOut className="size-4 text-red-400" />
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
            className="fixed top-17.5 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathName === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive ? "bg-emerald-500/10 text-emerald-500" : "text-gray-300 hover:bg-white/5 hover:text-emerald-400"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}

              <div className="h-px bg-white/10 my-2"></div>

              {!user ? (
                <div className="flex flex-col gap-3 px-2">
                  <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="bordered" className="w-full font-semibold border-white/20 text-white rounded-xl h-12">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-emerald-600 text-white font-semibold hover:bg-emerald-500 rounded-xl h-12 border-none">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-2">
                  <Link
                    href={`/dashboard/${user.role || 'user'}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                  >
                    <User size={20} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-left w-full"
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

export default Navbar;