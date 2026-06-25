import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { CheckCircle, ArrowRight, BookOpen } from "lucide-react";
import { createOrder } from "@/lib/actions/orders";

export default async function Success({ searchParams }) {

  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  // Retrieve Stripe session data with expand
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const { status, metadata } = session;

  // If payment is not completed, redirect to /
  if (status === "open") {
    return redirect("/");
  }

  // If payment is complete, save order to the database
  if (status === "complete") {
    try {
      await createOrder({
        userId: metadata.userId,
        userName: metadata.userName,
        userEmail: metadata.userEmail,
        userRole: metadata.userRole,
        bookId: metadata.bookId,
        bookTitle: metadata.bookTitle,
        deliveryFee: metadata.deliveryFee,
        coverImage: metadata.coverImage,
        sessionId: session.id,
        author: metadata.author,
        librarianEmail: metadata.librarianEmail,
      });
    } catch (err) {
      console.error("Failed to save order to database:", err);
    }

    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-300">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none hidden dark:block" />

        <div className="max-w-md w-full bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl p-8 relative z-10 text-center animate-in fade-in zoom-in duration-500">

          <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-500/20">
            <CheckCircle className="text-emerald-600 dark:text-emerald-400 size-10" />
          </div>

          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2 tracking-tight">
            Order Placed Successfully!
          </h1>

          <p className="text-zinc-500 dark:text-neutral-400 mb-8 text-sm leading-relaxed">
            We received your delivery request. The data has been securely saved under your profile, and the book status is now updated to <b className="text-zinc-700 dark:text-zinc-300">Pending Delivery</b>.
          </p>

          <div className="flex flex-col gap-3">
            {/* Dashboard Link */}
            <Link href="/dashboard/user" className="w-full">
              <button className="w-full flex items-center justify-center bg-emerald-600 text-white font-bold hover:bg-emerald-700 h-12 rounded-xl border-none shadow-lg shadow-emerald-900/20 transition-colors">
                <BookOpen className="size-4 mr-2" /> Go to Dashboard
              </button>
            </Link>

            {/* Browse Books Link */}
            <Link href="/books" className="w-full">
              <button className="w-full flex items-center justify-center bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10 h-12 rounded-xl font-bold transition-colors">
                Browse More Books <ArrowRight className="size-4 ml-2" />
              </button>
            </Link>
          </div>

        </div>
      </main>
    );
  }

  return redirect("/");
}