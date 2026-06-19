import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const body = await request.json();
    const { bookId, title, coverImage, deliveryFee, user } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              images: coverImage ? [coverImage] : [],
            },
            unit_amount: Math.round(deliveryFee * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/books/${bookId}`,

      
      metadata: {
        bookId: bookId,
        bookTitle: title,
        coverImage: coverImage,
        deliveryFee: deliveryFee.toString(),
        userId: user?.id || user?._id || "",
        userName: user?.name || "",
        userEmail: user?.email || "",
        userRole: user?.role || ""
      }
    });

    return NextResponse.json({ success: true, url: session.url })
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}