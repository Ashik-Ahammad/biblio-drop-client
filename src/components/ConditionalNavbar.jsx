"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  const hiddenRoutes = ["/signin", "/signup", "/choose-role", "/role-check", "/reset-password", "/forgot-password"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}