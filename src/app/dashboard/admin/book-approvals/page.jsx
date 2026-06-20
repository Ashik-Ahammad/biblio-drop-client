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
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <ShieldCheck className="text-emerald-500" size={32} /> Book Approvals
        </h1>
        <p className="text-neutral-400 mt-2">
          Review new book submissions. Approve them for public listing or permanently delete them.
        </p>
      </div>

      <ApprovalsTable books={pendingBooks} />
    </div>
  );
}