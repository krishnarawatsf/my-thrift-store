import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const supabase = createServerSupabaseClient()

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ products })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
