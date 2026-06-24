"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard") || pathname === "/success" || pathname === "/signin" || pathname === "/signup") {
    return null;
  }

  return <Footer />;
}