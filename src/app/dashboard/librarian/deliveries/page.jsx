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
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <Package className="text-emerald-500" /> Manage Deliveries
        </h1>
        <p className="text-neutral-400 mt-2">Update the shipping status of books ordered by your readers.</p>
      </div>
      <DeliveriesTable orders={orders} />
    </div>
  );
}