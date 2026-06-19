import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const params = await searchParams;
  const session_id = params?.session_id;

  if (!session_id) throw new Error("Please provide a valid session_id");

  // Stripe session data retrieving
  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    return redirect("/");
  }

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
    <main className="min-h-screen bg-[#000000] text-white flex items-center justify-center p-4 font-sans">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 max-w-lg text-center backdrop-blur-3xl shadow-2xl">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
          <span className="text-4xl">🎉</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-emerald-400">
          Order Placed Successfully!
        </h1>
        <p className="text-neutral-400 mb-8 leading-relaxed font-light">
          We received your delivery request. The data has been securely saved
          under your profile, and the book status is now updated to{" "}
          <b>Pending Delivery</b>.
        </p>
        <Link
          href="/books"
          className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all"
        >
          Browse More Books
        </Link>
      </div>
    </main>
  );
}
