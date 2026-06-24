import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { getLibrarianBooks } from "@/lib/api/books";
import InventoryTable from "./InventoryTable";
import { BookOpen } from "lucide-react";

export const metadata = { title: "Manage Inventory | BiblioDrop" };

export default async function InventoryPage() {
  const currentUser = await getUserSession();
  if (!currentUser || currentUser.role !== "librarian") redirect("/dashboard");

  const fetchedBooks = await getLibrarianBooks(currentUser.email);
  const books = Array.isArray(fetchedBooks) ? fetchedBooks : [];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white w-full transition-colors duration-300">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold flex items-center gap-3 text-neutral-900 dark:text-white">
          <BookOpen className="text-emerald-600 dark:text-emerald-500" /> Manage Inventory
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">Update details, unpublish, or delete your books.</p>
      </div>
      <InventoryTable books={books} />
    </div>
  );
}