"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard") || pathname === "/success" || pathname === "/signin" || pathname === "/signup" || pathname === "/choose-role" || pathname === "/role-check" || pathname === "/profile" || pathname === "/reset-password" || pathname === "/forgot-password") {
    return null;
  }

  return <Footer />;
}