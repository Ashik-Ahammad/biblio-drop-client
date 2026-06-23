import { serverFetch } from "../core/server";

export const getPublicStats = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/public-stats`, {
      cache: "no-store",
    });

    if (!res.ok) return { totalBooks: 0, totalReaders: 0, totalOrders: 0 };
    return await res.json();
  } catch (error) {
    console.error("Error fetching public stats:", error);
    return { totalBooks: 0, totalReaders: 0, totalOrders: 0 };
  }
};