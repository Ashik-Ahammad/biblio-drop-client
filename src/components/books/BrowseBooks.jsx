import { getUserSession } from "@/lib/core/session";
import BrowseBooksClient from "@/components/books/BrowseBooksClient";
import { getAllBooks } from "@/lib/api/books";

export const metadata = {
  title: "Browse Books | BiblioDrop",
};

export default async function BrowseBooksPage() {
  const currentUser = await getUserSession();

  const res = await getAllBooks(currentUser?.email || "", currentUser?.role || "", 1, 12);

  const books = res?.success ? res.data : [];
  const pagination = res?.pagination || { page: 1, totalPages: 1 };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#050505]">
      <BrowseBooksClient
        initialBooks={books}
        initialPagination={pagination}
        user={currentUser}
      />
    </main>
  );
}