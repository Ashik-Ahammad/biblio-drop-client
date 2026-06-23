"use client";

import React, { useState } from "react";
import { Table, Pagination } from "@heroui/react";
import { ReceiptText, CheckCircle, Clock, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function TransactionsClient({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [page, setPage] = useState(1);

  const itemsPerPage = 12;
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const currentPage = page > totalPages ? totalPages : page;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("ellipsis");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusStyles = (status) => {
    if (status === "Delivered") return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
    if (status === "Dispatched") return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
    return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
  };

  const getStatusIcon = (status) => {
    if (status === "Delivered") return <CheckCircle size={14} />;
    if (status === "Dispatched") return <Truck size={14} />;
    return <Clock size={14} />;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-neutral-50 dark:bg-[#050505] transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[95%] xl:max-w-7xl mx-auto"
      >
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2 md:gap-3">
            <ReceiptText className="text-emerald-600 dark:text-emerald-500" size={32} />
            All Transactions
          </h1>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-1">Monitor all platform orders, user purchases, and delivery statuses.</p>
        </div>

        <div className="bg-white dark:bg-gradient-to-b dark:from-[#111111] dark:to-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden flex flex-col transition-colors duration-300">
          <Table aria-label="Transactions Table" className="bg-transparent flex-1 shadow-none" classNames={{ wrapper: "p-0 shadow-none bg-transparent" }}>
            <Table.ScrollContainer className="overflow-x-auto scrollbar-hide">
              <Table.Content className="min-w-[1000px] w-full text-left border-collapse">
                <Table.Header className="bg-neutral-100 dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-white/10">
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider rounded-tl-xl">Order ID</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Customer Details</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Librarian Details</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider w-[25%]">Book Info</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Amount</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Date & Time</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider rounded-tr-xl">Status</Table.Column>
                </Table.Header>

                <Table.Body emptyContent={<span className="text-neutral-500 py-10 block text-center">No transactions found.</span>}>
                  {paginatedOrders.map((order) => {
                    const shortOrderId = order._id ? order._id.slice(-8).toUpperCase() : "N/A";
                    const orderDate = order.orderedAt ? new Date(order.orderedAt) : new Date();
                    const librarianName = order.book?.librarianEmail ? order.book.librarianEmail.split('@')[0] : "System";

                    return (
                      <Table.Row key={order._id} className="border-b border-neutral-200 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition-colors">
                        <Table.Cell className="p-4">
                          <span className="font-mono font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-white/5 px-2 py-1 rounded-md text-xs border border-neutral-200 dark:border-white/10">
                            #{shortOrderId}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm truncate max-w-[180px]">
                              {order.user?.name || "Unknown User"}
                            </span>
                            <span className="text-xs text-neutral-500 mt-0.5 truncate max-w-[180px]">
                              {order.user?.email || "No email"}
                            </span>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-neutral-800 dark:text-neutral-200 text-sm capitalize truncate max-w-[180px]">
                              {librarianName}
                            </span>
                            <span className="text-xs text-neutral-500 mt-0.5 truncate max-w-[180px]">
                              {order.book?.librarianEmail || "N/A"}
                            </span>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-neutral-900 dark:text-white text-sm truncate max-w-[250px] whitespace-normal">
                              {order.book?.title || "Unknown Title"}
                            </span>
                            <span className="text-xs text-neutral-500 mt-0.5">
                              {order.book?.category || "Uncategorized"}
                            </span>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            ${Number(order.book?.deliveryFee || 0).toFixed(2)}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-neutral-700 dark:text-neutral-200">
                              {orderDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="text-xs text-neutral-500 mt-0.5">
                              {orderDate.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border whitespace-nowrap ${getStatusStyles(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status || "Pending Delivery"}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>

          {totalItems > 0 && (
            <div className="p-4 border-t border-neutral-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 bg-neutral-50 dark:bg-[#111111] transition-colors duration-300">
              <Pagination>
                <Pagination.Summary className="text-neutral-500 dark:text-neutral-400 text-sm">
                  Showing {startItem}-{endItem} of {totalItems} results
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous isDisabled={currentPage === 1} onPress={() => setPage((p) => Math.max(1, p - 1))} className="bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 outline-none">
                      <Pagination.PreviousIcon />
                      <span className="hidden sm:inline">Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>

                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <Pagination.Item key={`ellipsis-${i}`}>
                        <Pagination.Ellipsis className="text-neutral-500" />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={p}>
                        <Pagination.Link
                          isActive={p === currentPage}
                          onPress={() => setPage(p)}
                          className={p === currentPage ? "bg-emerald-500 text-white border-emerald-500" : "bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 outline-none"}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    )
                  )}

                  <Pagination.Item>
                    <Pagination.Next isDisabled={currentPage === totalPages} onPress={() => setPage((p) => Math.min(totalPages, p + 1))} className="bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 outline-none">
                      <span className="hidden sm:inline">Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}

          {totalItems === 0 && (
            <div className="py-20 text-center">
              <ReceiptText className="mx-auto text-neutral-400 dark:text-neutral-700 mb-4" size={48} />
              <h3 className="text-neutral-900 dark:text-neutral-200 font-semibold text-lg">No transactions found</h3>
              <p className="text-neutral-500 text-sm mt-1">There are no orders placed in the system yet.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}