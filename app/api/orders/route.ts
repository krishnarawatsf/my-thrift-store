import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const supabase = createServerSupabaseClient()

  try {
    const { items, total, email, shippingAddress, phone, stripePaymentId } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      )
    }

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        items,
        total: total || items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
        status: 'processing',
        email,
        phone,
        shipping_address: shippingAddress,
        stripe_payment_id: stripePaymentId,
      })
      .select()

    if (error) throw error

    // Decrement inventory
    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single()

      if (product && product.stock > 0) {
        await supabase
          .from('products')
          .update({ stock: Math.max(0, product.stock - item.quantity) })
          .eq('id', item.id)
      }
    }

    return NextResponse.json({ order: order?.[0] })
  } catch (error: any) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}
