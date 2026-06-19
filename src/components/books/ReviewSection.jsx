"use client";

import React, { useState } from "react";
import { Button, TextArea } from "@heroui/react";
import { Star, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { submitReview } from "@/lib/actions/reviews";

export default function ReviewSection({ bookId, reviews, canReview, currentUser }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Review comment is required.");
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting review...");

    try {
      const data = await submitReview({
        bookId,
        userName: currentUser.name,
        userEmail: currentUser.email,
        rating,
        comment,
      });

      if (data.success) {
        toast.success("Review submitted!", { id: toastId });
        setComment("");
        setRating(5);
        router.refresh();
      } else throw new Error(data.message);
    } catch (error) {
      toast.error(error.message || "Failed to submit review", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-32 pt-20 border-t border-white/10">
      <h2 className="text-3xl font-extrabold mb-8">Reader Reviews</h2>

      {canReview && (
        <form onSubmit={handleSubmit} className="mb-12 bg-white/[0.02] border border-white/10 p-6 rounded-3xl">
          <h4 className="text-xl font-bold mb-4">Write a Review</h4>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer transition-colors ${star <= rating ? "fill-amber-400 text-amber-400" : "text-neutral-600"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <TextArea
            placeholder="Share your thoughts about this book..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-4"
            classNames={{ inputWrapper: "bg-[#121212] border-white/10 hover:border-emerald-500/50" }}
          />
          <Button type="submit" isLoading={isSubmitting} className="bg-emerald-600 font-bold text-white px-8">
            Submit Review
          </Button>
        </form>
      )}

      {reviews.length === 0 ? (
        <div className="bg-white/5 border border-white/5 rounded-3xl p-16 text-center flex flex-col items-center">
          <Star className="text-neutral-500 mb-4" size={40} />
          <h4 className="text-2xl font-bold mb-2">No reviews yet</h4>
          <p className="text-neutral-400">Be the first to review after receiving delivery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div key={rev._id} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><User size={20}/></div>
                  <div>
                    <p className="font-bold text-white">{rev.userName}</p>
                    <p className="text-xs text-neutral-500">{new Date(rev.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < rev.rating ? "fill-amber-400 text-amber-400" : "text-neutral-600"} />
                  ))}
                </div>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}