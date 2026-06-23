import TransactionsClient from "./TransactionsClient";
import { getAllOrders } from "@/lib/api/orders";

export const metadata = {
  title: "Transactions | BiblioDrop",
};

export default async function AdminTransactionsPage() {
  let orders = [];
  let isError = false;

  try {
    const fetchedOrders = await getAllOrders();
    if (!fetchedOrders) throw new Error("Failed to fetch transactions");
    orders = Array.isArray(fetchedOrders) ? fetchedOrders : [];
  } catch (error) {
    isError = true;
    console.error("Transactions Page Error:", error);
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-neutral-50 dark:bg-[#050505] flex items-center justify-center text-red-500 transition-colors duration-300">
        Failed to load transactions. Please check your server connection.
      </div>
    );
  }

  return <TransactionsClient initialOrders={orders} />;
}