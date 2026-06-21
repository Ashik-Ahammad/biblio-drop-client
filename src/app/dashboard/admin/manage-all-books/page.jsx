import ManageAllBooksClient from "./ManageAllBooksClient";

export default async function AdminManageAllBooksPage() {
  let books = [];
  let isError = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books?role=admin`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch books");

    const data = await res.json();

    books = data.success
      ? data.data.filter(book => book.status !== "Pending Approval")
      : [];
  } catch (error) {
    isError = true;
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-[#050505] flex items-center justify-center text-red-500">
        Failed to load books. Please check your server connection.
      </div>
    );
  }

  return <ManageAllBooksClient initialBooks={books} />;
}