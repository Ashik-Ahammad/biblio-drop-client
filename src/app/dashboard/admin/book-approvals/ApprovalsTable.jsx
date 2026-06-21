"use client";

import React, { useState } from "react";
import { Table, Button, AlertDialog } from "@heroui/react";
import { CheckCircle, Trash2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ApprovalsTable({ books }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const initialBooks = Array.isArray(books) ? books.map((b) => ({ ...b, id: b._id })) : [];
  const [tableItems, setTableItems] = useState(initialBooks);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleApprove = async (id) => {
    setLoadingId(`approve-${id}`);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${id}/approve`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Book published successfully!");
        setTableItems((prev) => prev.filter((book) => book.id !== id));
        router.refresh();
      } else {
        toast.error("Failed to approve book");
      }
    } catch (error) {
      toast.error("Network error");
    }
    setLoadingId(null);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;
    setLoadingId(`delete-${bookToDelete.id}`);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${bookToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Book deleted permanently");
        setTableItems((prev) => prev.filter((book) => book.id !== bookToDelete.id));
        setIsDeleteOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Network error");
    }
    setLoadingId(null);
  };

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
      <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

      <Table className="dark text-white relative z-10">
        <Table.ScrollContainer>
          <Table.Content aria-label="Approvals Table" className="min-w-[1000px]">
            <Table.Header className="bg-white/5 border-b border-white/10">
              <Table.Column isRowHeader className="text-neutral-400 font-bold uppercase text-xs py-4">Title</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">Author</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">Category</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">Fee</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">Librarian</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">Date</Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs text-right py-4">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {tableItems.map((book) => {
                const formattedDate = book.createdAt
                  ? new Date(book.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : "Unknown";

                return (
                  <Table.Row key={book.id} className="hover:bg-white/2 border-b border-white/5 transition-colors group">
                    <Table.Cell className="py-4">
                      <p className="font-bold text-white group-hover:text-emerald-400 transition-colors truncate max-w-[200px]" title={book.title}>
                        {book.title}
                      </p>
                    </Table.Cell>

                    <Table.Cell className="py-4 text-neutral-300">
                      {book.author}
                    </Table.Cell>

                    <Table.Cell className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {book.category}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="py-4 font-bold text-white">
                      ${Number(book.deliveryFee).toFixed(2)}
                    </Table.Cell>

                    <Table.Cell className="py-4 text-neutral-400 truncate max-w-[150px]" title={book.librarianEmail}>
                      {book.librarianEmail}
                    </Table.Cell>

                    <Table.Cell className="py-4 text-neutral-400 text-sm">
                      {formattedDate}
                    </Table.Cell>

                    <Table.Cell className="py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition-all duration-300"
                          isLoading={loadingId === `approve-${book.id}`}
                          onPress={() => handleApprove(book.id)}
                        >
                          <CheckCircle size={15} className="mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
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

      {tableItems.length === 0 && (
        <div className="text-neutral-500 py-16 flex flex-col items-center justify-center gap-3">
          <BookOpen size={40} className="text-neutral-700" />
          <p>No pending books to approve.</p>
        </div>
      )}

      <AlertDialog isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#0a0a0a] border border-white/10 text-white">
              <AlertDialog.CloseTrigger className="text-neutral-400 hover:text-white" />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-red-500 font-bold">Delete Book Pending Request?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-neutral-300 text-sm">
                  This will permanently delete <strong className="text-white">{bookToDelete?.title}</strong> and all of its data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer className="border-t border-white/5 pt-4 mt-4">
                <Button slot="close" variant="tertiary" className="text-neutral-300 hover:bg-white/5" onPress={() => setIsDeleteOpen(false)}>
                  Cancel
                </Button>
                <Button slot="close" variant="danger" className="bg-red-600 text-white hover:bg-red-700" isLoading={loadingId === `delete-${bookToDelete?.id}`} onPress={confirmDelete}>
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