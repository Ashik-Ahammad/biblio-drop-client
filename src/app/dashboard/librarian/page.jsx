export const dynamic = "force-dynamic";

import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { getLibrarianBooks } from "@/lib/api/books";
import { getLibrarianOrders } from "@/lib/api/orders";
import LibrarianOverviewClient from "./LibrarianOverviewClient";

export const metadata = { title: "Librarian Overview | Dashboard" };

export default async function LibrarianPage() {
  const currentUser = await getUserSession();

  if (!currentUser || currentUser.role !== "librarian") {
    redirect("/dashboard");
  }

  const booksRes = await getLibrarianBooks(currentUser.email);
  const ordersRes = await getLibrarianOrders(currentUser.email);

  const books = Array.isArray(booksRes) ? booksRes : [];
  const orders = Array.isArray(ordersRes) ? ordersRes : [];

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white w-full max-w-full overflow-x-hidden transition-colors duration-300">
      <div className="mb-6 sm:mb-8 lg:mb-10 relative z-10 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white break-words">
          Welcome back, <span className="text-emerald-600 dark:text-emerald-500">{currentUser.name.split(" ")[0]}!</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1.5 sm:mt-2 max-w-2xl">
          Here is the overview of your library inventory, earnings, and book requests.
        </p>
      </div>

      <LibrarianOverviewClient books={books} orders={orders} />
    </div>
  );
}