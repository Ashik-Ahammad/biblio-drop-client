export const dynamic = "force-dynamic";

import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { getPendingBooks } from "@/lib/api/books";
import ApprovalsTable from "./ApprovalsTable";
import { ShieldCheck } from "lucide-react";

export const metadata = { title: "Book Approvals | Admin" };

export default async function AdminBookApprovalsPage() {
  const currentUser = await getUserSession();
  if (!currentUser || currentUser.role !== "admin") redirect("/dashboard");

  const pendingBooks = await getPendingBooks();

  return (
    <div className="p-4 sm:p-6 md:p-10 min-h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white w-full transition-colors duration-300">
      <div className="mb-6 md:mb-10 max-w-[95%] xl:max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2 md:gap-3">
          <ShieldCheck className="text-emerald-600 dark:text-emerald-500" size={32} /> Book Approvals
        </h1>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-1 md:mt-2">
          Review new book submissions. Approve them for public listing or permanently delete them.
        </p>
      </div>

      <div className="max-w-[95%] xl:max-w-7xl mx-auto">
        <ApprovalsTable books={pendingBooks} />
      </div>
    </div>
  );
}