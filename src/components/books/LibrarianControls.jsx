"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { EyeOff, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toggleBookStatus } from "@/lib/actions/books";

import EditBookModal from "./EditBookModal";
import DeleteBookDialog from "./DeleteBookDialog";

export default function LibrarianControls({ bookId, bookTitle, currentStatus, bookData }) {
  const [isToggling, setIsToggling] = useState(false);
  const router = useRouter();
  const isPublished = currentStatus === "Published";

  const handleUnpublish = async () => {
    setIsToggling(true);
    const toastId = toast.loading("Updating status...");

    try {
      const data = await toggleBookStatus(bookId, currentStatus);
      if (data.success) {
        toast.success(`Book ${data.nextStatus}!`, { id: toastId });
        router.refresh();
      } else throw new Error(data.message);
    } catch (e) {
      toast.error(e.message || "Failed to update status", { id: toastId });
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 p-5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl backdrop-blur-md transition-colors duration-300">
      <p className="w-full text-sm font-bold text-emerald-800 dark:text-emerald-400 mb-2 transition-colors duration-300">Librarian Controls</p>

      <EditBookModal book={bookData} />

      <Button
        variant="flat"
        className="bg-neutral-200 dark:bg-white/10 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-white/20 font-bold transition-colors duration-300"
        isLoading={isToggling}
        startContent={isPublished ? <EyeOff size={16}/> : <Eye size={16}/>}
        onPress={handleUnpublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <DeleteBookDialog bookId={bookId} bookTitle={bookTitle} />
    </div>
  );
}