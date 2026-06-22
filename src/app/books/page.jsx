import React, { Suspense } from 'react';
import BooksLoading from "./loading";
import { getAllBooks } from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";
import BrowseBooks from '@/components/books/BrowseBooks';

export const metadata = {
  title: "Browse Books | BiblioDrop",
};

export default async function BrowseBooksPage() {
  const currentUser = await getUserSession();

  const res = await getAllBooks(currentUser?.email || "", currentUser?.role || "");

  const books = res?.success ? res.data : (Array.isArray(res) ? res : []);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#050505] text-neutral-900 dark:text-white transition-colors duration-300">
      <Suspense fallback={<BooksLoading />}>
        <BrowseBooks books={books} />
      </Suspense>
    </main>
  );
}