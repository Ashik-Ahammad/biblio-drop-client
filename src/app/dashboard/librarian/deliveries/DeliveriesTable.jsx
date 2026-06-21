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
    if (status === "Delivered") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (status === "Dispatched") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  };

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-2xl">
      <Table className="dark text-white">
        <Table.ScrollContainer>
          <Table.Content aria-label="Deliveries Table" className="min-w-[1000px]">
            <Table.Header className="bg-white/5 border-b border-white/10">
              <Table.Column isRowHeader className="text-neutral-400 font-bold uppercase text-xs py-4">Client Details</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">Order ID & Date</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">Book Title</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">Fee</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">Status</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs text-right py-4">Update Status</Table.Column>
            </Table.Header>

            <Table.Body
              items={tableItems}
              emptyContent={<span className="text-neutral-500 py-10 block text-center">No orders found.</span>}
            >
              {(order) => {
                const orderDate = order.orderedAt ? new Date(order.orderedAt).toLocaleDateString() : "Unknown Date";

                const shortOrderId = order.id ? order.id.slice(-8).toUpperCase() : "N/A";

                return (
                  <Table.Row key={order.id} className="hover:bg-white/5 border-b border-white/5 transition-colors">
                    <Table.Cell className="py-4">
                      <p className="font-bold text-white">{order.user?.name || "Unknown User"}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{order.user?.email || "No email provided"}</p>
                    </Table.Cell>

                    <Table.Cell className="py-4">
                      <p className="font-mono text-xs text-neutral-400 bg-white/5 inline-block px-2 py-0.5 rounded border border-white/10 mb-1">
                        #{shortOrderId}
                      </p>
                      <p className="text-xs text-neutral-500">{orderDate}</p>
                    </Table.Cell>

                    <Table.Cell className="text-neutral-300 font-medium py-4">
                      {order.book?.title || "Unknown Book"}
                    </Table.Cell>

                    <Table.Cell className="font-bold text-white py-4">
                      ${Number(order.book?.deliveryFee || 0).toFixed(2)}
                    </Table.Cell>

                    <Table.Cell className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="py-4">
                      <div className="flex justify-end gap-2">
                        {order.status === "Pending Delivery" && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/20"
                            isLoading={loadingId === order.id}
                            onPress={() => handleUpdateStatus(order.id, "Dispatched")}
                          >
                            <Truck size={14} className="mr-1"/> Dispatch
                          </Button>
                        )}

                        {order.status === "Dispatched" && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/20"
                            isLoading={loadingId === order.id}
                            onPress={() => handleUpdateStatus(order.id, "Delivered")}
                          >
                            <CheckCircle size={14} className="mr-1"/> Deliver
                          </Button>
                        )}

                        {order.status === "Delivered" && (
                          <span className="text-emerald-500 text-sm font-bold flex items-center gap-1 px-3 py-1">
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