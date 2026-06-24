import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getUserOrders } from "@/lib/api/orders";
import { BookMarked, User, Library, ChevronRight } from "lucide-react";

export const metadata = {
  title: "My Reading List | BiblioDrop",
};

export default async function ReadingListPage() {
  const currentUser = await getUserSession();

  if (!currentUser) {
    redirect("/signin");
  }

  const allOrders = await getUserOrders(currentUser.email);
  const deliveredBooks = allOrders.filter((order) => order.status === "Delivered");

  return (
    <div className="p-4 sm:p-6 md:p-10 min-h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white w-full transition-colors duration-300">
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2 sm:gap-3 text-neutral-900 dark:text-white">
          <BookMarked className="text-emerald-600 dark:text-emerald-500 w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
          My Reading List
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
          Your collection of successfully delivered books.
        </p>
      </div>

      {deliveredBooks.length === 0 ? (
        <div className="bg-white dark:bg-[#0a0a0a] border border-dashed border-neutral-300 dark:border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-16 text-center shadow-sm dark:shadow-none transition-colors duration-300">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">Your reading list is empty</h3>
          <p className="text-sm sm:text-base text-neutral-500 mt-2">No delivered books found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
          {deliveredBooks.map((order) => (
            <div
              key={order._id}
              className="group flex flex-col sm:flex-row items-stretch bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/30 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              <div className="relative w-full sm:w-40 md:w-44 lg:w-40 xl:w-48 h-56 sm:h-auto flex-shrink-0 bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
                <Image
                  src={order.book.coverImage}
                  alt={order.book.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between h-full w-full">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2 sm:line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {order.book.title}
                  </h3>

                  <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-emerald-600 dark:text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{order.book.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Library size={14} className="text-emerald-600/70 dark:text-emerald-500/70 shrink-0" />
                      <span className="truncate">{order.book.librarianEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <Link
                    href={`/books/${order.book.id}`}
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-2 text-sm font-bold text-neutral-700 dark:text-white bg-neutral-100 dark:bg-white/5 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl transition-all duration-300"
                  >
                    Write a Review <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}