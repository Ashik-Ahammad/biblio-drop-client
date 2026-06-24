import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { Table } from "@heroui/react";
import { History, Package, CheckCircle, Clock } from "lucide-react";
import { getUserOrders } from "@/lib/api/orders";

export const metadata = {
  title: "User Delivery History | BiblioDrop",
};

export default async function UserDeliveryHistoryPage() {
  const currentUser = await getUserSession();

  if (!currentUser) {
    redirect("/signin");
  }

  const orders = await getUserOrders(currentUser.email);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white font-sans w-full transition-colors duration-300">
      <div className="mb-10 relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3 text-neutral-900 dark:text-white">
          <History className="text-emerald-600 dark:text-emerald-500" size={28} strokeWidth={2.5} />
          Delivery History
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-sm md:text-base">
          Track your past and ongoing book delivery requests.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-3xl p-16 text-center flex flex-col items-center justify-center backdrop-blur-3xl shadow-sm dark:shadow-none">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 border border-neutral-200 dark:border-white/10">
            <Package className="text-neutral-500 dark:text-neutral-400" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-1 text-neutral-900 dark:text-white">No orders yet</h3>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-sm">
            You have not requested any book deliveries. Browse our collection
            and find your next read!
          </p>
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-2xl p-4 shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 right-0 w-75 h-75 bg-emerald-500/10 dark:bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />

          <Table
            variant="secondary"
            className="relative z-10 w-full"
            aria-label="Delivery History Table"
          >
            <Table.ScrollContainer>
              <Table.Content className="min-w-200">
                <Table.Header className="bg-neutral-100 dark:bg-white/5 border-b border-neutral-200 dark:border-white/10">
                  <Table.Column
                    isRowHeader
                    className="text-neutral-500 dark:text-neutral-400 font-bold tracking-wider uppercase text-xs"
                  >
                    Order ID
                  </Table.Column>
                  <Table.Column className="text-neutral-500 dark:text-neutral-400 font-bold tracking-wider uppercase text-xs">
                    Book Title
                  </Table.Column>
                  <Table.Column className="text-neutral-500 dark:text-neutral-400 font-bold tracking-wider uppercase text-xs">
                    Librarian
                  </Table.Column>
                  <Table.Column className="text-neutral-500 dark:text-neutral-400 font-bold tracking-wider uppercase text-xs">
                    Date & Time
                  </Table.Column>
                  <Table.Column className="text-neutral-500 dark:text-neutral-400 font-bold tracking-wider uppercase text-xs">
                    Fee
                  </Table.Column>
                  <Table.Column className="text-neutral-500 dark:text-neutral-400 font-bold tracking-wider uppercase text-xs">
                    Status
                  </Table.Column>
                </Table.Header>

                <Table.Body className="divide-y divide-neutral-200 dark:divide-white/5">
                  {orders.map((order) => {
                    const shortOrderId = order._id
                      .substring(order._id.length - 8)
                      .toUpperCase();
                    const orderDate = new Date(order.orderedAt);

                    return (
                      <Table.Row
                        key={order._id}
                        className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <Table.Cell>
                          <span className="font-mono font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-white/5 px-2 py-1 rounded-md text-xs border border-neutral-200 dark:border-white/10">
                            #{shortOrderId}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex flex-col">
                            <span className="font-bold text-neutral-900 dark:text-white text-base">
                              {order.book.title}
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                              {order.book.category || "Uncategorized"}
                            </span>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {order.book.librarianEmail || "N/A"}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex flex-col">
                            <span className="text-sm text-neutral-700 dark:text-neutral-200">
                              {orderDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                              {orderDate.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            ${order.book.deliveryFee}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${
                              order.status === "Delivered"
                                ? "bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                : "bg-amber-100 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {order.status === "Delivered" ? (
                              <CheckCircle size={14} />
                            ) : (
                              <Clock size={14} />
                            )}
                            {order.status}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
}