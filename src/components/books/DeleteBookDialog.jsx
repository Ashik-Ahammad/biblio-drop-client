"use client";
import React, { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteBook } from "@/lib/actions/books";

export default function DeleteBookDialog({ bookId, bookTitle }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting book...");

    try {
      const data = await deleteBook(bookId);
      if (data.success) {
        toast.success("Book deleted permanently!", { id: toastId });
        router.push("/books");
        router.refresh();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete", { id: toastId });
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <Button variant="flat" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold" startContent={<Trash2 size={16} />}>
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100 bg-[#0a0a0a] border border-white/10 text-white backdrop-blur-xl">
            <AlertDialog.CloseTrigger className="text-neutral-400 hover:text-white" />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" className="text-red-500" />
              <AlertDialog.Heading className="text-xl text-red-400  font-bold">Delete permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-neutral-400 text-sm leading-relaxed">
                This will permanently delete <strong className="text-white">`{bookTitle}`</strong> and all of its data from the library. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" className="text-neutral-400 hover:text-white">
                Cancel
              </Button>

              <Button variant="danger" className="bg-red-600 font-bold text-white" isLoading={isDeleting} onPress={handleDelete}>
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}