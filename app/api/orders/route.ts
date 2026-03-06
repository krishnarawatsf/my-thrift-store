import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const supabase = createServerSupabaseClient()

  try {
    const { items, total } = await req.json()

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        items,
        total,
        status: 'pending',
      })
      .select()

    if (error) throw error

    return NextResponse.json({ order: order?.[0] })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
