"use client";

import React, { useState } from "react";
import { Button, TextArea } from "@heroui/react";
import { Star, User, MessageSquareQuote, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { submitReview } from "@/lib/actions/reviews";

export default function ReviewSection({ bookId, reviews, canReview, currentUser }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
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
        setHoverRating(0);
        router.refresh();
      } else throw new Error(data.message);
    } catch (error) {
      toast.error(error.message || "Failed to submit review", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-24 lg:mt-32 pt-16 border-t border-neutral-200 dark:border-white/10 relative transition-colors duration-300">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <MessageSquareQuote className="text-emerald-600 dark:text-emerald-500 transition-colors duration-300" size={32} />
          <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight transition-colors duration-300">
            Reader Reviews
          </h2>
        </div>

        {canReview && (
          <form
            onSubmit={handleSubmit}
            className="mb-16 relative bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-6 sm:p-8 rounded-3xl shadow-lg dark:shadow-2xl overflow-hidden transition-colors duration-300"
          >

            <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />

            <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2 transition-colors duration-300">
              Share Your Thoughts
            </h4>

            <div className="flex items-center gap-2 mb-6 bg-neutral-50 dark:bg-black/40 w-fit p-3 rounded-2xl border border-neutral-200 dark:border-white/5 transition-colors duration-300">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer transition-all duration-300 hover:scale-110 ${
                    star <= (hoverRating || rating)
                      ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                      : "text-neutral-300 dark:text-neutral-700 hover:text-neutral-400 dark:hover:text-neutral-500"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
              <span className="ml-3 text-sm font-medium text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                {hoverRating || rating} out of 5
              </span>
            </div>


            <TextArea
              placeholder="What did you like or dislike about this book?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              minRows={4}
              className="mb-6 w-full"
              classNames={{
                base: "w-full",
                inputWrapper: "bg-neutral-50 dark:bg-black/50 border border-neutral-200 dark:border-white/10 hover:border-emerald-500/50 focus-within:!border-emerald-500 focus-within:!bg-white dark:focus-within:!bg-[#161616] focus-within:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 rounded-2xl p-4",
                input: "text-neutral-900 dark:text-white text-base leading-relaxed placeholder:text-neutral-400 dark:placeholder:text-neutral-600 resize-none",
              }}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base h-12 px-8 rounded-xl w-full sm:w-auto transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] flex items-center gap-2"
              >
                {!isSubmitting && <Send size={18} />}
                Publish Review
              </Button>
            </div>
          </form>
        )}

        {reviews.length === 0 ? (
          <div className="bg-neutral-50 dark:bg-[#0a0a0a] border border-dashed border-neutral-300 dark:border-white/10 rounded-3xl p-16 text-center flex flex-col items-center justify-center transition-colors duration-300">
            <div className="w-20 h-20 bg-neutral-200 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
              <Star className="text-neutral-400 dark:text-neutral-600 transition-colors duration-300" size={40} />
            </div>
            <h4 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 transition-colors duration-300">No reviews yet</h4>
            <p className="text-neutral-500 dark:text-neutral-500 max-w-sm mx-auto text-lg transition-colors duration-300">
              Be the first to share your experience after receiving this book.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="group bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 p-6 lg:p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-md dark:shadow-none hover:shadow-xl dark:hover:shadow-2xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-linear-to-br dark:from-emerald-500/20 dark:to-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900 dark:text-white text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {rev.userName}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-500 font-medium transition-colors duration-300">
                        {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 bg-neutral-50 dark:bg-black/40 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-white/5 transition-colors duration-300">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < rev.rating ? "fill-amber-400 text-amber-400" : "text-neutral-300 dark:text-neutral-700 transition-colors duration-300"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed transition-colors duration-300">
                  &quot;{rev.comment}&quot;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}