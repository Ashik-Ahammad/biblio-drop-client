import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getUserOrders } from "@/lib/api/orders";
import { BookMarked, User, Library, Star, ChevronRight } from "lucide-react";

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
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
          <BookMarked className="text-emerald-500" size={28} />
          My Reading List
        </h1>
        <p className="text-neutral-400 mt-2">
          Your collection of successfully delivered books.
        </p>
      </div>

      {deliveredBooks.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-dashed border-white/10 rounded-3xl p-16 text-center">
          <h3 className="text-xl font-bold">Your reading list is empty</h3>
          <p className="text-neutral-500 mt-2">No delivered books found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliveredBooks.map((order) => (
            <div
              key={order._id}
              className="group flex flex-col sm:flex-row items-center bg-[#0a0a0a] border border-white/10 hover:border-emerald-500/30 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              {/* Cover Image Area */}
              <div className="relative w-full sm:w-40 h-56 sm:h-full flex-shrink-0 bg-neutral-900 overflow-hidden">
                <Image
                  src={order.book.coverImage}
                  alt={order.book.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content Area */}
              <div className="flex-1 p-6 flex flex-col justify-between h-full w-full">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                    {order.book.title}
                  </h3>

                  <div className="flex flex-col gap-2 text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-emerald-500" />
                      <span>{order.book.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Library size={16} className="text-emerald-500/70" />
                      <span className="truncate">{order.book.librarianEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/books/${order.book.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/5 hover:bg-emerald-600 px-5 py-3 rounded-xl transition-all duration-300"
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