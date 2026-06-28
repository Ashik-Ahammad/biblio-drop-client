import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { getBookById } from '@/lib/api/books'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const body = await request.json();
    const { bookId, user } = body;

    if (!bookId) {
      return NextResponse.json({ success: false, message: "Book ID is missing" }, { status: 400 });
    }

    const bookRes = await getBookById(bookId);
    const realBook = bookRes?.success ? bookRes.data : null;

    if (!realBook) {
      return NextResponse.json({ success: false, message: "Book not found in database" }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",

            unit_amount: Math.round(Number(realBook.deliveryFee) * 100),
            product_data: {

              name: realBook.title,
              images: realBook.coverImage ? [realBook.coverImage] : [],
            }
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/books/${bookId}`,

      metadata: {
        bookId: realBook._id ? realBook._id.toString() : bookId,
        bookTitle: realBook.title,
        coverImage: realBook.coverImage || "",
        deliveryFee: realBook.deliveryFee.toString(),
        userId: user?.id || user?._id || "",
        userName: user?.name || "",
        userEmail: user?.email || "",
        userRole: user?.role || "",
        author: realBook.author || "Unknown Author",
        librarianEmail: realBook.librarianEmail || ""
      }
    });

    return NextResponse.json({ success: true, url: session.url })

  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}