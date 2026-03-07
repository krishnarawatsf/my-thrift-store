import { createServerSupabaseClient } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const { sessionId } = await req.json()
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
    }

    // Retrieve Stripe session to validate payment
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Build order items from Stripe line items (server-trusted)
    const stripeLineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 })

    const orderItems = (stripeLineItems.data || []).map((li: any) => {
      const md = li.price?.product?.metadata || li.price?.metadata || {}
      const productId = md.productId || li.description
      const size = md.size
      return {
        id: productId ? String(productId) : '',
        name: li.description,
        price: (li.price?.unit_amount ?? 0) / 100,
        size: size ? String(size) : '',
        quantity: li.quantity ?? 1,
      }
    })

    const total = (session.amount_total ?? 0) / 100

    // Create order in Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        items: orderItems,
        total: total,
        status: 'processing',
        email: session.customer_email,
        phone: session.metadata?.phone || null,
        shipping_address: session.metadata?.shipping_address
          ? JSON.parse(session.metadata.shipping_address)
          : null,
        stripe_payment_id: session.payment_intent,
      })
      .select()

    if (error) throw error

    // Decrement inventory for each item
    for (const item of orderItems) {
      if (!item.id) continue
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
