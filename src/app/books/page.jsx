export const dynamic = "force-dynamic";

import React, { Suspense } from 'react';
import BooksLoading from "./loading";
import { getAllBooks } from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";
import BrowseBooksClient from '@/components/books/BrowseBooksClient';

export const metadata = {
  title: "Browse Books | BiblioDrop",
};

export default async function BrowseBooksPage({ searchParams }) {
  const currentUser = await getUserSession();
  const params = await searchParams;

  const filters = {
    search: params?.search || "",
    category: params?.category || "",
    minPrice: params?.minPrice || "",
    maxPrice: params?.maxPrice || "",
    sort: params?.sort || "",
    availability: params?.availability || "",
  };

  const res = await getAllBooks({
    ...filters,
    email: currentUser?.email || "",
    role: currentUser?.role || "",
    page: 1,
    limit: 12
  });

  const books = res?.success ? res.data : [];
  const pagination = res?.pagination || { page: 1, totalPages: 1 };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#050505] text-neutral-900 dark:text-white transition-colors duration-300">
      <Suspense fallback={<BooksLoading />}>
        <BrowseBooksClient
          key={JSON.stringify(filters)}
          initialBooks={books}
          initialPagination={pagination}
          user={currentUser}
          currentFilters={filters}
        />
      </Suspense>
    </main>
  );
}