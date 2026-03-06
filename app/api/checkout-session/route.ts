import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { items, email } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Convert cart items to Stripe line items (convert rupees to paise)
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          metadata: { size: item.size },
        },
        unit_amount: item.price * 100, // Stripe uses cents/paise
      },
      quantity: item.quantity,
    }))

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      customer_email: email,
      metadata: {
        cart_items: JSON.stringify(items),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
