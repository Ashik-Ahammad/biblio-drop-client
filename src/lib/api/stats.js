import { serverFetch } from "../core/server";

export const getPublicStats = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/public-stats`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return { totalBooks: 0, totalReaders: 0, totalOrders: 0 };
    return await res.json();
  } catch (error) {
    console.error("Error fetching public stats:", error);
    return { totalBooks: 0, totalReaders: 0, totalOrders: 0 };
  }
};

export const getTopLibrarians = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/public-stats/top-librarians`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching top librarians:", error);
    return [];
  }
};

export const getPopularCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/public-stats/popular-categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return {};
    return await res.json();
  } catch (error) {
    console.error("Error fetching popular categories:", error);
    return {};
  }
};