"use client";

import React, { useState } from "react";
import { Table, AlertDialog, Button, Pagination } from "@heroui/react";
import { BookOpen, Eye, EyeOff, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  deleteBook,
  toggleBookStatus,
  fetchAdminBooksAction,
} from "@/lib/actions/books";

export default function ManageAllBooksClient({
  initialBooks,
  initialPagination,
}) {

  return (
    <ManageAllBooksInner
      key={`${initialPagination.page}-${initialBooks.length}`}
      initialBooks={initialBooks}
      initialPagination={initialPagination}
    />
  );
}

function ManageAllBooksInner({ initialBooks, initialPagination }) {
  const [books, setBooks] = useState(initialBooks);
  const [pagination, setPagination] = useState(initialPagination);
  const [loadingId, setLoadingId] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;
  const totalItems = pagination.totalItems;
  const itemsPerPage = 12;

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

  const handlePageChange = async (newPage) => {
    if (newPage === currentPage) return;

    setIsTableLoading(true);
    try {
      const response = await fetchAdminBooksAction(newPage, itemsPerPage);
      if (response?.success) {
        setBooks(response.data || []);
        setPagination(response.pagination);
      } else {
        toast.error("Failed to load page data");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching data");
    } finally {
      setIsTableLoading(false);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Published":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
      case "Unpublished":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-500/10 dark:text-neutral-400 dark:border-neutral-500/20";
    }
  };

  const handleToggleStatus = async (bookId, currentStatus) => {
    setLoadingId(bookId);
    const toastId = toast.loading("Updating status...");

    try {
      const data = await toggleBookStatus(bookId, currentStatus);
      if (data?.nextStatus || data?.success) {
        const nextStatus =
          data.nextStatus ||
          (currentStatus === "Published" ? "Unpublished" : "Published");
        setBooks(
          books.map((b) =>
            b._id === bookId ? { ...b, status: nextStatus } : b,
          ),
        );
        toast.success(`Book marked as ${nextStatus}`, { id: toastId });
      } else {
        throw new Error(data?.message || "Toggle failed");
      }
    } catch (error) {
      toast.error("Failed to update book status", { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteBook = async (bookId) => {
    const toastId = toast.loading("Deleting book...");
    try {
      const data = await deleteBook(bookId);
      if (data?.success) {
        setBooks(books.filter((b) => b._id !== bookId));
        toast.success("Book deleted permanently", { id: toastId });
      } else {
        toast.error(data?.message || "Failed to delete book", { id: toastId });
      }
    } catch (error) {
      toast.error("Network error while deleting", { id: toastId });
    }
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
            <BookOpen
              className="text-emerald-600 dark:text-emerald-500"
              size={32}
            />
            Manage All Books
          </h1>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-1">
            Review, publish, unpublish, or delete library inventory.
          </p>
        </div>

        <div className="bg-white dark:bg-gradient-to-b dark:from-[#111111] dark:to-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden flex flex-col relative transition-colors duration-300">
          {isTableLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-[1px] z-50 flex items-center justify-center text-emerald-600 dark:text-emerald-500 font-semibold text-sm">
              Loading books...
            </div>
          )}

          <Table
            aria-label="Manage Books Table"
            className="bg-transparent flex-1 shadow-none"
            classNames={{ wrapper: "p-0 shadow-none bg-transparent" }}
          >
            <Table.ScrollContainer className="overflow-x-auto scrollbar-hide">
              <Table.Content className="min-w-[1000px] w-full text-left border-collapse">
                <Table.Header className="bg-neutral-100 dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-white/10">
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider w-[30%] rounded-tl-xl">
                    Title & Category
                  </Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider w-[20%]">
                    Author
                  </Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    Fee
                  </Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider w-[15%]">
                    Librarian
                  </Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    Status
                  </Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider text-right rounded-tr-xl">
                    Actions
                  </Table.Column>
                </Table.Header>

                <Table.Body
                  emptyContent={
                    <span className="text-neutral-500 py-10 block text-center">
                      No books found.
                    </span>
                  }
                >
                  {books.map((book) => (
                    <Table.Row
                      key={book._id}
                      className="border-b border-neutral-200 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition-colors"
                    >
                      <Table.Cell className="p-4">
                        <div className="flex flex-col">
                          <p
                            className="text-neutral-900 dark:text-neutral-100 font-medium text-sm truncate max-w-[250px] lg:max-w-[350px] whitespace-normal"
                            title={book.title}
                          >
                            {book.title}
                          </p>
                          <span className="text-xs text-neutral-500 mt-0.5">
                            {book.category || "Uncategorized"}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="p-4 text-neutral-700 dark:text-neutral-300 text-sm whitespace-normal">
                        {book.author}
                      </Table.Cell>
                      <Table.Cell className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        ${parseFloat(book.deliveryFee).toFixed(2)}
                      </Table.Cell>
                      <Table.Cell className="p-4 text-neutral-600 dark:text-neutral-400 text-xs truncate max-w-[150px]">
                        {book.librarianEmail}
                      </Table.Cell>
                      <Table.Cell className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-medium inline-block whitespace-nowrap ${getStatusStyles(book.status)}`}
                        >
                          {book.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            isIconOnly
                            variant="flat"
                            isLoading={loadingId === book._id}
                            onPress={() =>
                              handleToggleStatus(book._id, book.status)
                            }
                            className={
                              book.status === "Published"
                                ? "h-9 w-9 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "h-9 w-9 bg-neutral-100 text-neutral-600 dark:bg-[#1a1a1a] dark:text-neutral-400"
                            }
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            isIconOnly
                            variant="flat"
                            onPress={() => handleDeleteBook(book._id)}
                            className="h-9 w-9 bg-neutral-100 text-red-600 dark:bg-[#1a1a1a] dark:text-red-500"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
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
                  <Pagination.Previous
                    isDisabled={currentPage === 1}
                    onPress={() => handlePageChange(currentPage - 1)}
                  />
                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <Pagination.Ellipsis key={i} />
                    ) : (
                      <Pagination.Link
                        key={p}
                        isActive={p === currentPage}
                        onPress={() => handlePageChange(p)}
                      >
                        {p}
                      </Pagination.Link>
                    ),
                  )}
                  <Pagination.Next
                    isDisabled={currentPage === totalPages}
                    onPress={() => handlePageChange(currentPage + 1)}
                  />
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
