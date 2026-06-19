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
    <div className="flex flex-wrap items-center gap-4 mb-8 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl backdrop-blur-md">
      <p className="w-full text-sm font-bold text-emerald-400 mb-2">Librarian Controls</p>

      {/*  Edit Modal */}
      <EditBookModal book={bookData} />

      {/* Unpublish Toggle Button */}
      <Button
        variant="flat"
        className="bg-white/10 text-white hover:bg-white/20 font-bold"
        isLoading={isToggling}
        startContent={isPublished ? <EyeOff size={16}/> : <Eye size={16}/>}
        onPress={handleUnpublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      {/*  Reusable Delete Dialog */}
      <DeleteBookDialog bookId={bookId} bookTitle={bookTitle} />
    </div>
  );
}