import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getUserOrders } from "@/lib/api/orders"; 
import { Card } from "@heroui/react";
import { BookMarked, User, Library, ChevronRight, BookDashed } from "lucide-react";

export const metadata = {
  title: "My Reading List | BiblioDrop",
};

export default async function ReadingListPage() {
  const currentUser = await getUserSession();

  if (!currentUser) {
    redirect("/signin");
  }

  // get all orders
  const allOrders = await getUserOrders(currentUser.email);

  // only delivered book
  const deliveredBooks = allOrders.filter((order) => order.status === "Delivered");

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white font-sans w-full">

      <div className="mb-10 relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
          <BookMarked className="text-emerald-500" size={28} strokeWidth={2.5} />
          My Reading List
        </h1>
        <p className="text-neutral-400 mt-2 text-sm md:text-base">
          Books that have been successfully delivered to you. Enjoy your reading!
        </p>
      </div>

      {deliveredBooks.length === 0 ? (
        <div className="bg-white/2 border border-white/5 rounded-3xl p-16 text-center flex flex-col items-center justify-center backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-50%] left-[50%] translate-x-[-50%] w-75 h-75 bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 relative z-10">
            <BookDashed className="text-neutral-500" size={36} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white relative z-10">Your reading list is empty</h3>
          <p className="text-neutral-400 max-w-md font-light leading-relaxed relative z-10">
            You do not have any delivered books yet. Track your current requests in the Delivery History.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {deliveredBooks.map((order) => (
            <Card
              key={order._id}
              className="w-full bg-[#0a0a0a] border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-400 group overflow-hidden rounded-2xl"
            >
              <div className="relative w-full aspect-2/3 overflow-hidden bg-neutral-900 border-b border-white/5">
                <Image
                  src={order.book.coverImage}
                  alt={order.book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
              </div>

              <Card.Header className="flex flex-col items-start gap-2 p-5 bg-[#0a0a0a]">
                <Card.Title className="text-white text-lg font-bold line-clamp-1 tracking-tight">
                  {order.book.title}
                </Card.Title>

                <Card.Description className="text-neutral-400 text-sm flex flex-col gap-2 w-full font-medium">
                  {/* সরাসরি order.book থেকে author এবং librarianEmail দেখানো হচ্ছে */}
                  <span className="flex items-center gap-2">
                    <User size={14} className="text-emerald-500" />
                    <span className="truncate">{order.book.author || "Unknown Author"}</span>
                  </span>
                  <span className="flex items-center gap-2 text-xs text-neutral-500">
                    <Library size={12} className="text-emerald-500/70" />
                    <span className="truncate">{order.book.librarianEmail || "BiblioDrop Library"}</span>
                  </span>
                </Card.Description>
              </Card.Header>

              <Card.Footer className="px-5 pb-5 pt-0 bg-[#0a0a0a]">
                <Link
                  href={`/books/${order.book.id}`}
                  className="w-full flex items-center justify-between text-sm font-bold text-white bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/5 hover:border-emerald-500/30 px-4 py-2.5 rounded-xl transition-colors"
                >
                  Write a Review <ChevronRight size={16} />
                </Link>
              </Card.Footer>

            </Card>
          ))}
        </div>
      )}
    </div>
  );
}