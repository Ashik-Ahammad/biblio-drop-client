"use client";

import React, { useState } from "react";
import { Table, Button, Modal } from "@heroui/react";
import { Edit2, Trash2, Eye, EyeOff, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateBook, deleteBook, toggleBookStatus } from "@/lib/actions/books";
import Image from "next/image";

export default function InventoryTable({ books }) {
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const tableItems = Array.isArray(books)
    ? books.map((book) => ({ ...book, id: book._id }))
    : [];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Unpublished":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-neutral-500/10 text-neutral-300 border-neutral-500/20";
    }
  };

  const handleToggleStatus = async (book) => {
    if (!book?._id) return;
    try {
      const res = await toggleBookStatus(book._id, book.status);
      if (res?.success) {
        toast.success(`Book is now ${res.nextStatus}`);
        router.refresh();
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook?._id) return;

    setIsEditing(true);
    const formData = new FormData(e.target);
    const updatedData = {
      title: formData.get("title"),
      category: formData.get("category"),
      deliveryFee: parseFloat(formData.get("deliveryFee")),
      description: formData.get("description"),
    };

    const res = await updateBook(selectedBook._id, updatedData);
    if (res?.success) {
      toast.success("Book updated successfully");
      router.refresh();
      setIsEditOpen(false);
    } else {
      toast.error("Failed to update book");
    }
    setIsEditing(false);
  };

  const handleDeleteConfirm = async () => {
    if (!bookToDelete?._id) return;

    setIsDeleting(true);
    const res = await deleteBook(bookToDelete._id);
    if (res?.success) {
      toast.success("Book deleted permanently");
      router.refresh();
      setIsDeleteOpen(false);
    } else {
      toast.error("Failed to delete book");
    }
    setIsDeleting(false);
  };

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-2xl">
      <Table className="dark text-white">
        <Table.ScrollContainer>
          <Table.Content aria-label="Inventory Table" className="min-w-[800px]">
            <Table.Header className="bg-white/5 border-b border-white/10">
              <Table.Column isRowHeader className="text-neutral-400 font-bold uppercase text-xs py-4">
                Book
              </Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">
                Category
              </Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs py-4">
                Status
              </Table.Column>
              <Table.Column className="text-neutral-400 font-bold uppercase text-xs text-right py-4">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body
              items={tableItems}
              emptyContent={<span className="text-neutral-500 py-10 block text-center">No books found in inventory.</span>}
            >
              {(book) => (
                <Table.Row key={book.id} className="hover:bg-white/[0.02] border-b border-white/5">
                  <Table.Cell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-14 relative rounded overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
                        <Image
                          src={book?.coverImage || "/assets/logo.png"}
                          alt={book?.title || "Book"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-bold text-white max-w-[200px] truncate">
                        {book?.title || "Untitled"}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-neutral-400 py-3">
                    {book?.category || "Uncategorized"}
                  </Table.Cell>
                  <Table.Cell className="py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(book?.status)}`}>
                      {book?.status || "Unknown"}
                    </span>
                  </Table.Cell>
                  <Table.Cell className="py-3">
                    <div className="flex justify-end items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/5 text-white hover:bg-white/10"
                        isDisabled={book?.status === "Pending Approval"}
                        onPress={() => handleToggleStatus(book)}
                        title={book?.status === "Published" ? "Unpublish" : "Publish"}
                      >
                        {book?.status === "Published" ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                        onPress={() => {
                          setSelectedBook(book);
                          setIsEditOpen(true);
                        }}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        onPress={() => {
                          setBookToDelete(book);
                          setIsDeleteOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* EDIT MODAL */}
      <Modal isOpen={isEditOpen} onOpenChange={setIsEditOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-[#0a0a0a] border border-white/10 text-white shadow-2xl">
              <Modal.CloseTrigger className="text-neutral-400 hover:text-white" />
              <Modal.Header>
                <Modal.Heading className="text-xl text-sky-200 font-bold">Edit Book Details</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">

                <form key={selectedBook?.id} id="edit-book-form" onSubmit={handleEditSubmit} className="flex flex-col gap-4">

                  {/* Title */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-neutral-300">Title</label>
                    <input
                      name="title"
                      type="text"
                      defaultValue={selectedBook?.title || ""}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-neutral-300">Category</label>
                    <input
                      name="category"
                      type="text"
                      defaultValue={selectedBook?.category || ""}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Delivery Fee */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-neutral-300">Delivery Fee ($)</label>
                    <input
                      name="deliveryFee"
                      type="number"
                      defaultValue={selectedBook?.deliveryFee || ""}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-neutral-300">Description</label>
                    <textarea
                      name="description"
                      defaultValue={selectedBook?.description || ""}
                      required
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 resize-none transition-colors"
                    />
                  </div>

                </form>
              </Modal.Body>
              <Modal.Footer className="border-t border-white/5">
                <Button variant="secondary" onPress={() => setIsEditOpen(false)} className="bg-white/5 text-white hover:bg-white/20">
                  Cancel
                </Button>
                <Button form="edit-book-form" type="submit" isLoading={isEditing} className="bg-emerald-600 text-white hover:bg-emerald-700">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* DELETE ALERT DIALOG */}
      <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-[#0a0a0a] border border-white/10 text-white">
              <Modal.CloseTrigger className="text-neutral-400 hover:text-white" />
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold text-red-500 flex items-center gap-2">
                  <AlertTriangle size={20} /> Confirm Deletion
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <p className="text-neutral-300">
                  Are you sure you want to delete <span className="font-bold text-white">{bookToDelete?.title || "this book"}</span>? This action cannot be undone.
                </p>
              </Modal.Body>
              <Modal.Footer className="border-t border-white/5">
                <Button variant="secondary" onPress={() => setIsDeleteOpen(false)} className="bg-white/10 text-white hover:bg-white/20">
                  Cancel
                </Button>
                <Button onPress={handleDeleteConfirm} isLoading={isDeleting} className="bg-red-600 text-white hover:bg-red-700">
                  Delete Book
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}