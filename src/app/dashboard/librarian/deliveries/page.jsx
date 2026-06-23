export const dynamic = "force-dynamic";
import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { getLibrarianOrders } from "@/lib/api/orders";
import DeliveriesTable from "./DeliveriesTable";
import { Package } from "lucide-react";

export const metadata = { title: "Manage Deliveries | BiblioDrop" };

export default async function DeliveriesPage() {
  const currentUser = await getUserSession();
  if (!currentUser || currentUser.role !== "librarian") redirect("/dashboard");

  const fetchedOrders = await getLibrarianOrders(currentUser.email);
  const orders = Array.isArray(fetchedOrders) ? fetchedOrders : [];

  return (
    <div className="p-4 sm:p-6 md:p-10 min-h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white w-full transition-colors duration-300">
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2 md:gap-3">
          <Package className="text-emerald-600 dark:text-emerald-500" /> Manage Deliveries
        </h1>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-2">Update the shipping status of books ordered by your readers.</p>
      </div>
      <DeliveriesTable orders={orders} />
    </div>
  );
}