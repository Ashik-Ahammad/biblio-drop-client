import React from "react";
import StatsClient from "./StatsClient";
import { getPublicStats } from "@/lib/api/stats";
export default async function Stats() {
  
  const stats = await getPublicStats();

  return (
    <StatsClient
      totalBooks={stats.totalBooks}
      activeReaders={stats.totalReaders}
      booksOrdered={stats.totalOrders}
    />
  );
}