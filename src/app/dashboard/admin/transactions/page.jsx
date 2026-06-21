import TransactionsClient from "./TransactionsClient";

export default async function AdminTransactionsPage() {
  let orders = [];
  let isError = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch transactions");

    const data = await res.json();
    orders = data.success ? data.data : [];
  } catch (error) {
    isError = true;
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-[#050505] flex items-center justify-center text-red-500">
        Failed to load transactions. Please check your server connection.
      </div>
    );
  }

  return <TransactionsClient initialOrders={orders} />;
}