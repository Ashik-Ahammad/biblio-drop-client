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
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <BookOpen className="text-emerald-500" /> Manage Inventory
        </h1>
        <p className="text-neutral-400 mt-2">Update details, unpublish, or delete your books.</p>
      </div>
      <InventoryTable books={books} />
    </div>
  );
}