import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getUserReviews } from "@/lib/api/reviews";
import { Button } from "@heroui/react";
import { Star, MessageSquareQuote } from "lucide-react";
import ReviewListClient from "./ReviewListClient";

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
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white font-sans w-full max-w-full overflow-x-hidden transition-colors duration-300">
      <div className="mb-6 sm:mb-8 md:mb-10 relative z-10 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2.5 sm:gap-3 text-neutral-900 dark:text-white break-words">
          <MessageSquareQuote
            className="text-emerald-600 dark:text-emerald-500 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 shrink-0"
            strokeWidth={2.5}
          />
          My Reviews
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1.5 sm:mt-2 text-sm sm:text-base max-w-2xl">
          All the thoughts and ratings you have shared about the books you have read.
        </p>
      </div>

      {userReviews.length === 0 ? (
        <div className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center flex flex-col items-center justify-center backdrop-blur-3xl shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors duration-300 w-full">
          <div className="absolute top-[-50%] left-[50%] translate-x-[-50%] w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-emerald-500/10 dark:bg-emerald-900/10 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-neutral-200 dark:border-white/10 relative z-10 shrink-0">
            <Star className="text-neutral-500 dark:text-neutral-400 w-8 h-8 sm:w-9 sm:h-9" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-neutral-900 dark:text-white relative z-10 px-4">
            No reviews yet
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xs sm:max-w-sm md:max-w-md font-light leading-relaxed relative z-10 mb-6 sm:mb-8 px-4">
            You have not reviewed any books yet. Once your ordered books are delivered, you can share your experience!
          </p>
          <Link href="/dashboard/user/reading-list" className="w-full sm:w-auto px-4 sm:px-0">
            <Button className="w-full sm:w-auto bg-neutral-200 dark:bg-white/10 text-neutral-900 dark:text-white font-bold h-11 sm:h-12 px-6 sm:px-8 rounded-xl hover:bg-neutral-300 dark:hover:bg-white/20 transition-colors">
              Go to Reading List
            </Button>
          </Link>
        </div>
      ) : (
        <ReviewListClient reviews={userReviews} />
      )}
    </div>
  );
}