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
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white font-sans w-full">

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

        <ReviewListClient reviews={userReviews} />
      )}
    </div>
  );
}