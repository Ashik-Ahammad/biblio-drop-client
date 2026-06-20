"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, Modal } from "@heroui/react";
import { Star, Edit2, Trash2, BookOpen, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

export default function ReviewListClient({ reviews }) {
  const router = useRouter();

  const [selectedReview, setSelectedReview] = useState(null);

  // Edit State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Delete State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handlers
  const openEditModal = (review) => {
    setSelectedReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editRating || !editComment)
      return toast.error("Please provide both rating and comment");

    setIsEditing(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/${selectedReview._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating: editRating, comment: editComment }),
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Review updated successfully");
        setIsEditOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to update review");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
    setIsEditing(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/${selectedReview._id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Review deleted successfully");
        setIsDeleteOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
    setIsDeleting(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {reviews.map((review) => {
          const reviewDate = new Date(review.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          );

          return (
            <Card
              key={review._id}
              className="w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:border-emerald-500/30 transition-colors shadow-2xl group flex flex-col relative"
            >
              {/* (Edit & Delete) */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 w-8 h-8 p-0 min-w-0"
                  onPress={() => openEditModal(review)}
                >
                  <Edit2 size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-red-500/10 text-red-400 hover:bg-red-500/20 w-8 h-8 p-0 min-w-0"
                  onPress={() => {
                    setSelectedReview(review);
                    setIsDeleteOpen(true);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              {/* Header: Book Info */}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/5 pr-16">
                {review.bookImage ? (
                  <div className="relative w-12 h-16 rounded-md overflow-hidden bg-neutral-900 shrink-0">
                    <Image
                      src={review.bookImage}
                      alt={review.bookTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-16 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                    <BookOpen size={20} className="text-neutral-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/books/${review.bookId}`}
                    className="font-bold text-white text-base hover:text-emerald-400 transition-colors line-clamp-1 block"
                  >
                    {review.bookTitle}
                  </Link>
                  <p className="text-xs text-neutral-500 mt-1">{reviewDate}</p>
                </div>
              </div>

              {/* Body: Rating and Comment */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-700"
                      }
                    />
                  ))}
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed italic flex-1">
                  `{review.comment}`
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* HeroUI v3 Modal: Edit Review */}
      <Modal isOpen={isEditOpen} onOpenChange={setIsEditOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-[#0a0a0a] border border-white/10 text-white">
              <Modal.CloseTrigger className="text-neutral-400 hover:text-white" />
              <Modal.Header>
                <Modal.Heading className="text-xl text-white font-bold">
                  Edit Review
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <form
                  id="edit-review-form"
                  onSubmit={handleEditSubmit}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <label className="text-sm font-medium text-neutral-300 block mb-2">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            size={24}
                            className={
                              star <= editRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-neutral-700"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-neutral-300">
                      Your Comment
                    </label>
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      required
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer className="border-t border-white/5">
                <Button
                  variant="secondary"
                  onPress={() => setIsEditOpen(false)}
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
                <Button
                  form="edit-review-form"
                  type="submit"
                  isLoading={isEditing}
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-[#0a0a0a] border border-white/10 text-white">
              <Modal.CloseTrigger className="text-neutral-400 hover:text-white" />
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold text-red-500 flex items-center gap-2">
                  <AlertTriangle size={20} /> Delete Review
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <p className="text-neutral-300">
                  Are you sure you want to delete your review for{" "}
                  <span className="font-bold text-white">
                    {selectedReview?.bookTitle}
                  </span>
                  ? This action cannot be undone.
                </p>
              </Modal.Body>
              <Modal.Footer className="border-t border-white/5">
                <Button
                  variant="secondary"
                  onPress={() => setIsDeleteOpen(false)}
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleDeleteConfirm}
                  isLoading={isDeleting}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete Review
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
