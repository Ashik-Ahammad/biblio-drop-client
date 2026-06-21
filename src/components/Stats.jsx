import React from "react";
import StatsClient from "./StatsClient";

export default async function Stats() {
  let totalBooks = 0;
  let activeReaders = 0;
  let booksOrdered = 0;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const [usersRes, booksRes, ordersRes] = await Promise.all([
      fetch(`${baseUrl}/api/users`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/books`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/orders`, { next: { revalidate: 60 } })
    ]);

    const usersData = await usersRes.json();
    const booksData = await booksRes.json();
    const ordersData = await ordersRes.json();

    const users = Array.isArray(usersData) ? usersData : (usersData.data || []);
    const books = booksData.success ? booksData.data : [];
    const orders = ordersData.success ? ordersData.data : [];

    activeReaders = users.length || 0;
    totalBooks = books.length || 0;
    booksOrdered = orders.length || 0;

  } catch (error) {
    console.error("Error fetching stats data:", error);
  }

  return (
    <StatsClient
      totalBooks={totalBooks}
      activeReaders={activeReaders}
      booksOrdered={booksOrdered}
    />
  );
}