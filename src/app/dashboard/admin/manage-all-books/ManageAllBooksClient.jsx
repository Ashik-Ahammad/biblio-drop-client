"use client";

import React, { useState } from "react";
import { Table, AlertDialog, Button, Pagination } from "@heroui/react";
import { BookOpen, Eye, EyeOff, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ManageAllBooksClient({ initialBooks }) {
  const [books, setBooks] = useState(initialBooks);
  const [loadingId, setLoadingId] = useState(null);
  const [page, setPage] = useState(1);

  const itemsPerPage = 12;
  const totalItems = books.length;
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
  const paginatedBooks = books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Published":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Unpublished":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
    }
  };

  const handleToggleStatus = async (bookId, currentStatus) => {
    setLoadingId(bookId);
    const toastId = toast.loading("Updating status...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${bookId}/unpublish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentStatus }),
      });

      if (res.ok) {
        const { nextStatus } = await res.json();
        setBooks(books.map(b => b._id === bookId ? { ...b, status: nextStatus } : b));
        toast.success(`Book marked as ${nextStatus}`, { id: toastId });
      } else throw new Error("Toggle failed");
    } catch (error) {
      toast.error("Failed to update book status", { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteBook = async (bookId) => {
    const toastId = toast.loading("Deleting book...");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${bookId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBooks(books.filter(b => b._id !== bookId));
        toast.success("Book deleted permanently", { id: toastId });
      } else {
        toast.error("Failed to delete book", { id: toastId });
      }
    } catch (error) {
      toast.error("Network error while deleting", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[95%] xl:max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="text-emerald-500" size={32} />
            Manage All Books
          </h1>
          <p className="text-neutral-400 mt-1">Review, publish, unpublish, or delete library inventory.</p>
        </div>

        <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <Table aria-label="Manage Books Table" className="bg-transparent flex-1">
            <Table.ScrollContainer className="overflow-x-auto scrollbar-hide">
              <Table.Content className="min-w-[1000px] w-full text-left border-collapse">

                <Table.Header className="bg-[#1a1a1a] border-b border-white/10">
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider w-[30%]">Title & Category</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider w-[20%]">Author</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Fee</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider w-[15%]">Librarian</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Status</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider text-right">Actions</Table.Column>
                </Table.Header>

                <Table.Body>
                  {paginatedBooks.map((book) => {
                    const isPublished = book.status === "Published";

                    return (
                      <Table.Row key={book._id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">

                        <Table.Cell className="p-4">
                          <div className="flex flex-col">
                            <p className="text-neutral-100 font-medium text-sm truncate max-w-[250px] lg:max-w-[350px]" title={book.title}>
                              {book.title}
                            </p>
                            <span className="text-xs text-neutral-500 mt-0.5">{book.category || "Uncategorized"}</span>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <p className="text-neutral-300 text-sm">{book.author}</p>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <span className="text-emerald-400 font-medium">${parseFloat(book.deliveryFee).toFixed(2)}</span>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <p className="text-neutral-400 text-xs truncate max-w-[150px]" title={book.librarianEmail}>
                            {book.librarianEmail}
                          </p>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <span className={`px-3 py-1 rounded-full border text-xs font-medium inline-block ${getStatusStyles(book.status)}`}>
                            {book.status}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">

                            <Button
                              isIconOnly
                              variant="flat"
                              isLoading={loadingId === book._id}
                              onPress={() => handleToggleStatus(book._id, book.status)}
                              className={isPublished ? "h-9 w-9 min-w-9 rounded-lg border transition-all outline-none flex items-center justify-center bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white" : "h-9 w-9 min-w-9 rounded-lg border transition-all outline-none flex items-center justify-center bg-[#1a1a1a] text-neutral-400 border-white/10 hover:text-white hover:bg-white/10"}
                              title={isPublished ? "Unpublish Book" : "Publish Book"}
                            >
                              {isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                            </Button>

                            <AlertDialog>
                              <Button
                                isIconOnly
                                variant="flat"
                                className="h-9 w-9 min-w-9 bg-[#1a1a1a] text-red-500 hover:bg-red-500 hover:text-white border border-white/10 hover:border-red-500 transition-all rounded-lg outline-none"
                              >
                                <Trash2 size={16} />
                              </Button>

                              <AlertDialog.Backdrop className="bg-black/80 backdrop-blur-sm">
                                <AlertDialog.Container>
                                  <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-2xl outline-none">
                                    <AlertDialog.CloseTrigger className="text-neutral-500 hover:text-white outline-none" />

                                    <AlertDialog.Header className="flex flex-col gap-3">
                                      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mx-auto">
                                        <AlertDialog.Icon status="danger" className="text-red-500" />
                                      </div>
                                      <AlertDialog.Heading className="text-xl font-bold text-white text-center">
                                        Delete Book
                                      </AlertDialog.Heading>
                                    </AlertDialog.Header>

                                    <AlertDialog.Body className="text-center mt-2">
                                      <p className="text-neutral-400 text-sm leading-relaxed">
                                        Are you sure you want to permanently delete <strong className="text-neutral-100">{book.title}</strong>? This action cannot be undone.
                                      </p>
                                    </AlertDialog.Body>

                                    <AlertDialog.Footer className="flex gap-3 mt-6">
                                      <Button
                                        slot="close"
                                        variant="flat"
                                        className="flex-1 bg-[#1a1a1a] hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl h-11 transition-colors outline-none"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        slot="close"
                                        onPress={() => handleDeleteBook(book._id)}
                                        className="flex-1 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl h-11 transition-colors border-none outline-none"
                                      >
                                        Delete
                                      </Button>
                                    </AlertDialog.Footer>
                                  </AlertDialog.Dialog>
                                </AlertDialog.Container>
                              </AlertDialog.Backdrop>
                            </AlertDialog>

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
            <div className="p-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#111111]">
              <Pagination>
                <Pagination.Summary className="text-neutral-400 text-sm">
                  Showing {startItem}-{endItem} of {totalItems} results
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous isDisabled={currentPage === 1} onPress={() => setPage((p) => Math.max(1, p - 1))} className="bg-[#1a1a1a] border border-white/10 text-neutral-300 hover:bg-white/10">
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
                          className={p === currentPage ? "bg-emerald-500 text-white border-emerald-500" : "bg-[#1a1a1a] border border-white/10 text-neutral-300 hover:bg-white/10"}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    )
                  )}

                  <Pagination.Item>
                    <Pagination.Next isDisabled={currentPage === totalPages} onPress={() => setPage((p) => Math.min(totalPages, p + 1))} className="bg-[#1a1a1a] border border-white/10 text-neutral-300 hover:bg-white/10">
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
              <BookOpen className="mx-auto text-neutral-700 mb-4" size={48} />
              <h3 className="text-neutral-200 font-semibold text-lg">No books found</h3>
              <p className="text-neutral-500 text-sm mt-1">The library inventory is currently empty.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}