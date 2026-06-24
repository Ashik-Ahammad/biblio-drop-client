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
    <div className="p-4 sm:p-6 md:p-10 min-h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white w-full transition-colors duration-300">
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
          Welcome back, <span className="text-emerald-600 dark:text-emerald-500">{currentUser.name.split(" ")[0]}!</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 sm:mt-2">
          Here is your reading overview and account statistics.
        </p>
      </div>

      <UserOverviewClient orders={orders} />
    </div>
  );
}