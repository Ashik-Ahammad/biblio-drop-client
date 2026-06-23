"use client";

import React, { useState } from "react";
import { Table, Button, AlertDialog } from "@heroui/react";
import { CheckCircle, Trash2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { approveBookRequest, deleteBook } from "@/lib/actions/books";

export default function ApprovalsTable({ books }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const initialBooks = Array.isArray(books)
    ? books.map((b) => ({ ...b, id: b._id }))
    : [];
  const [tableItems, setTableItems] = useState(initialBooks);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleApprove = async (id) => {
    setLoadingId(`approve-${id}`);
    const data = await approveBookRequest(id);

    if (data?.success) {
      toast.success("Book published successfully!");
      setTableItems((prev) => prev.filter((book) => book.id !== id));
      router.refresh();
    } else {
      toast.error(data?.message || "Failed to approve book");
    }
    setLoadingId(null);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;
    setLoadingId(`delete-${bookToDelete.id}`);

    const data = await deleteBook(bookToDelete.id);

    if (data?.success) {
      toast.success("Book deleted permanently");
      setTableItems((prev) => prev.filter((book) => book.id !== bookToDelete.id));
      setIsDeleteOpen(false);
      router.refresh();
    } else {
      toast.error(data?.message || "Failed to delete book");
    }
    setLoadingId(null);
  };

  return (
    <div className="w-full bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-2xl p-2 sm:p-4 shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

      <Table aria-label="Approvals Table" className="bg-transparent shadow-none relative z-10" classNames={{ wrapper: "p-0 shadow-none bg-transparent" }}>
        <Table.ScrollContainer className="overflow-x-auto scrollbar-hide">
          <Table.Content className="min-w-[1000px] w-full text-left border-collapse">
            <Table.Header className="bg-neutral-100 dark:bg-white/5 border-b border-neutral-200 dark:border-white/10">
              <Table.Column isRowHeader className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4 rounded-tl-xl">Title</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4">Author</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4">Category</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4">Fee</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4">Librarian</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs py-4 px-4">Date</Table.Column>
              <Table.Column className="text-neutral-600 dark:text-neutral-400 font-bold uppercase text-xs text-right py-4 px-4 rounded-tr-xl">Actions</Table.Column>
            </Table.Header>

            <Table.Body emptyContent={<span className="text-neutral-500 py-10 block text-center flex flex-col items-center gap-3"><BookOpen size={40} className="text-neutral-400 dark:text-neutral-700" /> No pending books to approve.</span>}>
              {tableItems.map((book) => {
                const formattedDate = book.createdAt
                  ? new Date(book.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Unknown";

                return (
                  <Table.Row key={book.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 border-b border-neutral-200 dark:border-white/5 transition-colors group">
                    <Table.Cell className="py-4 px-4">
                      <p className="font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate max-w-[200px]" title={book.title}>
                        {book.title}
                      </p>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4 text-neutral-700 dark:text-neutral-300">
                      {book.author}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20 border inline-block whitespace-nowrap">
                        {book.category}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4 font-bold text-neutral-900 dark:text-white">
                      ${Number(book.deliveryFee).toFixed(2)}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4 text-neutral-600 dark:text-neutral-400 truncate max-w-[150px]" title={book.librarianEmail}>
                      {book.librarianEmail}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4 text-neutral-500 dark:text-neutral-400 text-sm whitespace-nowrap">
                      {formattedDate}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="flat"
                          className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white dark:bg-emerald-600/20 dark:text-emerald-400 dark:border-emerald-500/20 dark:hover:bg-emerald-600 dark:hover:text-white border transition-all duration-300 outline-none"
                          isLoading={loadingId === `approve-${book.id}`}
                          onPress={() => handleApprove(book.id)}
                        >
                          <CheckCircle size={15} className="mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="flat"
                          className="bg-red-100 text-red-600 border-red-200 hover:bg-red-600 hover:text-white dark:bg-red-500/10 dark:text-red-500 dark:border-red-500/20 dark:hover:bg-red-500 dark:hover:text-white border transition-all duration-300 outline-none"
                          onPress={() => {
                            setBookToDelete(book);
                            setIsDeleteOpen(true);
                          }}
                        >
                          <Trash2 size={15} className="mr-1" /> Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <AlertDialog isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialog.Backdrop className="bg-black/60 dark:bg-black/80 backdrop-blur-sm">
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px] bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white outline-none rounded-2xl p-6">
              <AlertDialog.CloseTrigger className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white outline-none" />
              <AlertDialog.Header className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center border border-red-200 dark:border-red-500/20 mx-auto">
                  <AlertDialog.Icon status="danger" className="text-red-600 dark:text-red-500" />
                </div>
                <AlertDialog.Heading className="text-red-600 dark:text-red-500 font-bold text-xl text-center">
                  Delete Book Pending Request?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body className="text-center mt-2">
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                  This will permanently delete{" "}
                  <strong className="text-neutral-900 dark:text-white">{bookToDelete?.title}</strong>{" "}
                  and all of its data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer className="flex gap-3 pt-4 mt-4 border-t border-neutral-200 dark:border-white/5">
                <Button
                  slot="close"
                  variant="flat"
                  className="flex-1 bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white font-medium rounded-xl h-11 transition-colors outline-none"
                  onPress={() => setIsDeleteOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  slot="close"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl h-11 transition-colors border-none outline-none"
                  isLoading={loadingId === `delete-${bookToDelete?.id}`}
                  onPress={confirmDelete}
                >
                  Delete Permanently
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}