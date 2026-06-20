export const dynamic = "force-dynamic";

import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/lib/api/orders";
import UserOverviewClient from "./UserOverviewClient";

export const metadata = { title: "Overview | Dashboard" };

export default async function UserDashboardPage() {
  const currentUser = await getUserSession();
  if (!currentUser || currentUser.role !== "user") redirect("/dashboard");

  const orders = await getUserOrders(currentUser.email);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">
          Welcome back, <span className="text-emerald-500">{currentUser.name.split(" ")[0]}!</span>
        </h1>
        <p className="text-neutral-400 mt-2">
          Here is your reading overview and account statistics.
        </p>
      </div>

      {/* Passing data to the client component for Recharts rendering */}
      <UserOverviewClient orders={orders} />
    </div>
  );
}