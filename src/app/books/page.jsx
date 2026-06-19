import React, { Suspense } from 'react';
import BrowseBooks from "@/components/BrowseBooks";
import BooksLoading from "./loading";
import { getAllBooks } from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Browse Books | BiblioDrop",
};

export default async function BrowseBooksPage() {
  const currentUser = await getUserSession();

  const res = await getAllBooks(currentUser?.email || "", currentUser?.role || "");

  const books = res?.success ? res.data : (Array.isArray(res) ? res : []);

  return (
    <main>
      <Suspense fallback={<BooksLoading />}>
        <BrowseBooks books={books} />
      </Suspense>
    </main>
  );
}