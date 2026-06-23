import ManageAllBooksClient from "./ManageAllBooksClient";
import { getAllBooksForAdmin } from "@/lib/api/books";

export default async function AdminManageAllBooksPage() {
  let books = [];
  let pagination = { page: 1, totalPages: 1, totalItems: 0 };
  let isError = false;

  try {
    const response = await getAllBooksForAdmin(1, 12);
    if (!response?.success) throw new Error("Failed to fetch books");
    books = response.data || [];
    pagination = response.pagination || pagination;
  } catch (error) {
    isError = true;
    console.error("Manage All Books Page Error:", error);
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-neutral-50 dark:bg-[#050505] flex items-center justify-center text-red-500 transition-colors duration-300">
        Failed to load books. Please check your server connection.
      </div>
    );
  }

  return <ManageAllBooksClient initialBooks={books} initialPagination={pagination} />;
}