import React, { Suspense } from 'react';
import BrowseBooks from "@/components/BrowseBooks";
import BooksLoading from "./loading";
import { getAllBooks } from "@/lib/api/books";

export const metadata = {
  title: "Browse Books | BiblioDrop",
};

export default async function BrowseBooksPage() {

  const res = await getAllBooks();
  const books = res?.success ? res.data : [];

  return (
    <main>
      <Suspense fallback={<BooksLoading />}>
        <BrowseBooks books={books} />
      </Suspense>
    </main>
  );
}