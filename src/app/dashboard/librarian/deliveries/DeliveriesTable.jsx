"use client";

import React, { useState } from "react";
import { Table, Button } from "@heroui/react";
import { Truck, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/lib/actions/orders";

export default function DeliveriesTable({ orders }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const tableItems = Array.isArray(orders)
    ? orders.map((order) => ({ ...order, id: order._id }))
    : [];

  const handleUpdateStatus = async (orderId, newStatus) => {
    setLoadingId(orderId);
    const res = await updateOrderStatus(orderId, newStatus);
    if (res?.success) {
      toast.success(`Order marked as ${newStatus}`);
      router.refresh();
    } else {
      toast.error("Failed to update order");
    }
    setLoadingId(null);
  };

  const getStatusBadge = (status) => {
    if (status === "Delivered") return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
    if (status === "Dispatched") return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
    return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
  };

  return (
    <div className="w-full bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-2xl p-2 sm:p-4 shadow-sm dark:shadow-2xl transition-colors duration-300 overflow-hidden">
      <Table aria-label="Deliveries Table" className="bg-transparent shadow-none" classNames={{ wrapper: "p-0 bg-transparent shadow-none" }}>
        <Table.ScrollContainer className="overflow-x-auto scrollbar-hide">
          <Table.Content className="min-w-[900px] w-full text-left border-collapse">
            <Table.Header className="bg-neutral-100 dark:bg-white/5 border-b border-neutral-200 dark:border-white/10">
              <Table.Column isRowHeader className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4 rounded-tl-xl">Client Details</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4">Order ID & Date</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4">Book Title</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4">Fee</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4">Status</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs text-right py-4 px-4 rounded-tr-xl">Update Status</Table.Column>
            </Table.Header>

            <Table.Body
              items={tableItems}
              emptyContent={<span className="text-neutral-500 dark:text-neutral-500 py-10 block text-center">No orders found.</span>}
            >
              {(order) => {
                const orderDate = order.orderedAt ? new Date(order.orderedAt).toLocaleDateString() : "Unknown Date";
                const shortOrderId = order.id ? order.id.slice(-8).toUpperCase() : "N/A";

                return (
                  <Table.Row key={order.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 border-b border-neutral-200 dark:border-white/5 transition-colors">
                    <Table.Cell className="py-4 px-4">
                      <p className="font-bold text-neutral-900 dark:text-white">{order.user?.name || "Unknown User"}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{order.user?.email || "No email provided"}</p>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4">
                      <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-white/5 inline-block px-2 py-0.5 rounded border border-neutral-200 dark:border-white/10 mb-1">
                        #{shortOrderId}
                      </p>
                      <p className="text-xs text-neutral-500">{orderDate}</p>
                    </Table.Cell>

                    <Table.Cell className="text-neutral-700 dark:text-neutral-300 font-medium py-4 px-4 whitespace-normal min-w-[200px]">
                      {order.book?.title || "Unknown Book"}
                    </Table.Cell>

                    <Table.Cell className="font-bold text-neutral-900 dark:text-white py-4 px-4">
                      ${Number(order.book?.deliveryFee || 0).toFixed(2)}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-block whitespace-nowrap ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        {order.status === "Pending Delivery" && (
                          <Button
                            size="sm"
                            variant="flat"
                            className="bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-200 dark:bg-blue-600/20 dark:text-blue-400 dark:hover:bg-blue-600/30 dark:border-blue-500/20 outline-none"
                            isLoading={loadingId === order.id}
                            onPress={() => handleUpdateStatus(order.id, "Dispatched")}
                          >
                            <Truck size={14} className="mr-1"/> Dispatch
                          </Button>
                        )}

                        {order.status === "Dispatched" && (
                          <Button
                            size="sm"
                            variant="flat"
                            className="bg-emerald-100 text-emerald-600 hover:bg-emerald-200 border-emerald-200 dark:bg-emerald-600/20 dark:text-emerald-400 dark:hover:bg-emerald-600/30 dark:border-emerald-500/20 outline-none"
                            isLoading={loadingId === order.id}
                            onPress={() => handleUpdateStatus(order.id, "Delivered")}
                          >
                            <CheckCircle size={14} className="mr-1"/> Deliver
                          </Button>
                        )}

                        {order.status === "Delivered" && (
                          <span className="text-emerald-600 dark:text-emerald-500 text-sm font-bold flex items-center gap-1 px-3 py-1 whitespace-nowrap">
                            <CheckCircle size={16} /> Completed
                          </span>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              }}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}