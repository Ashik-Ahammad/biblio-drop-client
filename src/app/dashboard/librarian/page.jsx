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

  // Fetching books and orders
  const booksRes = await getLibrarianBooks(currentUser.email);
  const ordersRes = await getLibrarianOrders(currentUser.email);

  const books = Array.isArray(booksRes) ? booksRes : [];
  const orders = Array.isArray(ordersRes) ? ordersRes : [];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white w-full">
      <div className="mb-10 relative z-10">
        <h1 className="text-3xl font-extrabold text-white">
          Welcome back, <span className="text-emerald-500">{currentUser.name.split(" ")[0]}!</span>
        </h1>
        <p className="text-neutral-400 mt-2">
          Here is the overview of your library inventory, earnings, and book requests.
        </p>
      </div>

      <LibrarianOverviewClient books={books} orders={orders} />
    </div>
  );
}