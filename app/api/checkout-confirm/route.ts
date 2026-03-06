import { createServerSupabaseClient } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const { sessionId, items } = await req.json()

    // Retrieve Stripe session to validate payment
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    // Create order in Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        items: items,
        total: total,
        status: 'processing',
        email: session.customer_email,
        stripe_payment_id: session.payment_intent,
      })
      .select()

    if (error) throw error

    // Decrement inventory for each item
    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single()

      if (product) {
        await supabase
          .from('products')
          .update({ stock: Math.max(0, product.stock - item.quantity) })
          .eq('id', item.id)
      }
    }

    return NextResponse.json({ orderId: order?.[0]?.id })
  } catch (error) {
    console.error('Checkout confirm error:', error)
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    )
  }
}
