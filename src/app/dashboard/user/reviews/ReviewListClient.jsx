"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, Modal } from "@heroui/react";
import { Star, Edit2, Trash2, BookOpen, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { updateReview, deleteReview } from "@/lib/actions/reviews";

export default function ReviewListClient({ reviews }) {
  const router = useRouter();

  const [selectedReview, setSelectedReview] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      const data = await updateReview(selectedReview._id, {
        rating: editRating,
        comment: editComment,
      });

      if (data?.success) {
        toast.success("Review updated successfully");
        setIsEditOpen(false);
        router.refresh();
      } else {
        toast.error(data?.message || "Failed to update review");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const data = await deleteReview(selectedReview._id);

      if (data?.success) {
        toast.success("Review deleted successfully");
        setIsDeleteOpen(false);
        router.refresh();
      } else {
        toast.error(data?.message || "Failed to delete review");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 relative z-10 w-full">
        {reviews.map((review) => {
          const reviewDate = new Date(review.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          );

          return (
            <Card
              key={review._id}
              className="w-full bg-white dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-neutral-200 dark:border-white/10 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl hover:border-emerald-500/50 dark:hover:border-emerald-500/30 transition-all duration-300 shadow-sm dark:shadow-2xl group flex flex-col relative overflow-hidden"
            >
              {/* Card Header Section - Now properly flexed instead of absolute */}
              <div className="flex items-start justify-between gap-3 mb-4 pb-4 sm:mb-5 sm:pb-5 border-b border-neutral-200 dark:border-white/5">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  {review.bookImage ? (
                    <div className="relative w-12 h-16 sm:w-14 sm:h-20 rounded-md overflow-hidden bg-neutral-200 dark:bg-neutral-900 shrink-0">
                      <Image
                        src={review.bookImage}
                        alt={review.bookTitle}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-16 sm:w-14 sm:h-20 rounded-md bg-neutral-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                      <BookOpen size={24} className="text-neutral-500 dark:text-neutral-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/books/${review.bookId}`}
                      className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors line-clamp-2 block leading-snug"
                    >
                      {review.bookTitle}
                    </Link>
                    <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 truncate">
                      {reviewDate}
                    </p>
                  </div>
                </div>

                {/* Action Buttons - Part of the normal flow now */}
                <div className="flex gap-1.5 sm:gap-2 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-20">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/20 w-8 h-8 sm:w-9 sm:h-9 p-0 min-w-0 rounded-lg sm:rounded-xl"
                    onPress={() => openEditModal(review)}
                  >
                    <Edit2 size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 w-8 h-8 sm:w-9 sm:h-9 p-0 min-w-0 rounded-lg sm:rounded-xl"
                    onPress={() => {
                      setSelectedReview(review);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>

              {/* Card Body Section */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-2 sm:mb-3 shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={`sm:w-4 sm:h-4 shrink-0 ${
                        star <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-300 dark:text-neutral-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed italic flex-1 break-words line-clamp-4 sm:line-clamp-none">
                  `{review.comment}`
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={setIsEditOpen} placement="center">
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-md w-[92%] sm:w-[95%] mx-auto bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white rounded-2xl sm:rounded-3xl">
              <Modal.CloseTrigger className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white top-3 right-3 sm:top-4 sm:right-4 z-10" />
              <Modal.Header className="p-4 sm:p-6 pb-2">
                <Modal.Heading className="text-lg sm:text-xl text-neutral-900 dark:text-white font-bold">
                  Edit Review
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-4 sm:p-6 pt-0">
                <form
                  id="edit-review-form"
                  onSubmit={handleEditSubmit}
                  className="flex flex-col gap-4 sm:gap-5"
                >
                  <div>
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 block mb-2">
                      Rating
                    </label>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110 p-1 shrink-0"
                        >
                          <Star
                            size={24}
                            className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 ${
                              star <= editRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-neutral-300 dark:text-neutral-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Your Comment
                    </label>
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      required
                      rows={4}
                      className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-3.5 text-sm sm:text-base text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-all"
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer className="border-t border-neutral-200 dark:border-white/5 p-4 sm:p-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Button
                  variant="secondary"
                  onPress={() => setIsEditOpen(false)}
                  className="w-full sm:w-auto bg-neutral-200 dark:bg-white/10 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-white/20 text-sm h-11 sm:h-10 rounded-xl sm:rounded-lg order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button
                  form="edit-review-form"
                  type="submit"
                  isLoading={isEditing}
                  className="w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-700 text-sm h-11 sm:h-10 rounded-xl sm:rounded-lg order-1 sm:order-2"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen} placement="center">
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-md w-[92%] sm:w-[95%] mx-auto bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white rounded-2xl sm:rounded-3xl">
              <Modal.CloseTrigger className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white top-3 right-3 sm:top-4 sm:right-4 z-10" />
              <Modal.Header className="p-4 sm:p-6 pb-2">
                <Modal.Heading className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-500 flex items-center gap-2">
                  <AlertTriangle size={20} className="sm:w-6 sm:h-6 shrink-0" /> Delete Review
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-4 sm:p-6 pt-0">
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 mt-2 leading-relaxed break-words">
                  Are you sure you want to delete your review for{" "}
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {selectedReview?.bookTitle}
                  </span>
                  ? This action cannot be undone.
                </p>
              </Modal.Body>
              <Modal.Footer className="border-t border-neutral-200 dark:border-white/5 p-4 sm:p-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Button
                  variant="secondary"
                  onPress={() => setIsDeleteOpen(false)}
                  className="w-full sm:w-auto bg-neutral-200 dark:bg-white/10 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-white/20 text-sm h-11 sm:h-10 rounded-xl sm:rounded-lg order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleDeleteConfirm}
                  isLoading={isDeleting}
                  className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 text-sm h-11 sm:h-10 rounded-xl sm:rounded-lg order-1 sm:order-2"
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