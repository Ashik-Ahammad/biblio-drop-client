import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getUserReviews } from "@/lib/api/reviews";
import { Button, Card } from "@heroui/react";
import { Star, MessageSquareQuote, BookOpen } from "lucide-react";

export const metadata = {
  title: "My Reviews | BiblioDrop",
};

export default async function ReviewsPage() {
  const currentUser = await getUserSession();

  if (!currentUser || currentUser.role !== "user") {
    redirect("/dashboard");
  }

  const userReviews = await getUserReviews(currentUser.email);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white font-sans w-full">

      {/* Page Header */}
      <div className="mb-10 relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
          <MessageSquareQuote className="text-emerald-500" size={28} strokeWidth={2.5} />
          My Reviews
        </h1>
        <p className="text-neutral-400 mt-2 text-sm md:text-base">
          All the thoughts and ratings you have shared about the books you have read.
        </p>
      </div>

      {userReviews.length === 0 ? (

        <div className="bg-white/2 border border-white/5 rounded-3xl p-16 text-center flex flex-col items-center justify-center backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-50%] left-[50%] translate-x-[-50%] w-75 h-75 bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 relative z-10">
            <Star className="text-neutral-500" size={36} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white relative z-10">No reviews yet</h3>
          <p className="text-neutral-400 max-w-md font-light leading-relaxed relative z-10 mb-6">
            You have not reviewed any books yet. Once your ordered books are delivered, you can share your experience!
          </p>
          <Link href="/dashboard/user/reading-list">
            <Button className="bg-white/10 text-white font-bold h-12 px-8 rounded-xl hover:bg-white/20">
              Go to Reading List
            </Button>
          </Link>
        </div>
      ) : (
        /* Reviews Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
          {userReviews.map((review) => {
            const reviewDate = new Date(review.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            });

            return (
              <Card
                key={review._id}
                className="w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:border-emerald-500/30 transition-colors shadow-2xl group flex flex-col"
              >
                {/* Header: Book Info */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/5">
                  {review.bookImage ? (
                    <div className="relative w-12 h-16 rounded-md overflow-hidden bg-neutral-900 shrink-0">
                      <Image src={review.bookImage} alt={review.bookTitle} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-16 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                      <BookOpen size={20} className="text-neutral-500" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <Link href={`/books/${review.bookId}`} className="font-bold text-white text-base hover:text-emerald-400 transition-colors line-clamp-1 block">
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
                        className={star <= review.rating ? "fill-amber-400 text-amber-400" : "text-neutral-700"}
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
      )}
    </div>
  );
}