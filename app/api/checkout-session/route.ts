import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { items, email, shippingAddress, phone } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    const normalizedItems = (items as any[]).map((item) => ({
      id: String(item.id),
      size: String(item.size),
      quantity: Math.max(1, Number(item.quantity) || 1),
    }))

    const ids = Array.from(new Set(normalizedItems.map((i) => i.id)))
    const { data: products, error } = await supabase
      .from('products')
      .select('id,name,price,stock')
      .in('id', ids)

    if (error) throw error

    const productById = new Map((products || []).map((p: any) => [String(p.id), p]))

    // Build Stripe line items from DB-backed prices (prevents price tampering)
    const lineItems = normalizedItems.map((item) => {
      const product = productById.get(item.id)
      if (!product) {
        throw new Error(`Product not found: ${item.id}`)
      }
      if (typeof product.stock === 'number' && product.stock <= 0) {
        throw new Error(`Out of stock: ${product.name}`)
      }

      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.name,
            metadata: { productId: String(product.id), size: item.size },
          },
          unit_amount: Number(product.price) * 100,
        },
        quantity: item.quantity,
      }
    })

    const origin = process.env.NEXT_PUBLIC_BASE_URL ?? new URL(req.url).origin

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // Stripe returns here after payment; the checkout page will confirm + redirect to /order-confirmation/[id]
      success_url: `${origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      customer_email: email,
      metadata: {
        cart_items: JSON.stringify(normalizedItems),
        shipping_address: shippingAddress ? JSON.stringify(shippingAddress) : '',
        phone: phone ? String(phone) : '',
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
