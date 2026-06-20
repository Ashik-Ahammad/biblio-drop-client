import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import Link from "next/link";
import { CheckCircle, ArrowRight, BookOpen } from "lucide-react";

export default async function Success({ searchParams }) {
  const params = await searchParams;
  const session_id = params?.session_id;

  if (!session_id) throw new Error("Please provide a valid session_id");

  // Retrieve Stripe session data
  const session = await stripe.checkout.sessions.retrieve(session_id);

  // If payment is not completed, redirect to home
  if (session.status === "open") {
    return redirect("/");
  }

  // If payment is complete, save order to the database
  if (session.status === "complete") {
    const meta = session.metadata;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: meta.userId,
          userName: meta.userName,
          userEmail: meta.userEmail,
          userRole: meta.userRole,
          bookId: meta.bookId,
          bookTitle: meta.bookTitle,
          deliveryFee: meta.deliveryFee,
          coverImage: meta.coverImage,
          sessionId: session.id,
          author: meta.author,
          librarianEmail: meta.librarianEmail,
        }),
      });
    } catch (err) {
      console.error("Failed to save order to database:", err);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-300">

      {/* Decorative Glow Background for Dark Mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none hidden dark:block" />

      {/* Main Success Card */}
      <div className="max-w-md w-full bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl p-8 relative z-10 text-center animate-in fade-in zoom-in duration-500">

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-500/20">
          <CheckCircle className="text-emerald-600 dark:text-emerald-400 size-10" />
        </div>

        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2 tracking-tight">
          Order Placed Successfully!
        </h1>

        <p className="text-zinc-500 dark:text-neutral-400 mb-8 text-sm leading-relaxed">
          We received your delivery request. The data has been securely saved under your profile, and the book status is now updated to <b className="text-zinc-700 dark:text-zinc-300">Pending Delivery</b>.
        </p>

        {/* Action Links */}
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