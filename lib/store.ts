'use client'

import { create } from 'zustand'
import { useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isHydrated: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  hydrate: () => void
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isHydrated: false,

  hydrate: () => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem('cart-storage')
      if (stored) {
        const { items } = JSON.parse(stored)
        set({ items, isHydrated: true })
      } else {
        set({ isHydrated: true })
      }
    } catch (e) {
      console.error('Failed to hydrate cart:', e)
      set({ isHydrated: true })
    }
  },
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.id === item.id && i.size === item.size
      )
      const newItems = existing
        ? state.items.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...state.items, item]

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart-storage', JSON.stringify({ items: newItems }))
      }

      return { items: newItems }
    }),

  removeItem: (id, size) =>
    set((state) => {
      const newItems = state.items.filter((i) => !(i.id === id && i.size === size))

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart-storage', JSON.stringify({ items: newItems }))
      }

      return { items: newItems }
    }),

  updateQuantity: (id, size, quantity) =>
    set((state) => {
      const newItems = state.items.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      )

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart-storage', JSON.stringify({ items: newItems }))
      }

      return { items: newItems }
    }),

  clearCart: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart-storage')
    }
    set({ items: [] })
  },

  total: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}))

export function useCartHydration() {
  const hydrate = useCart((state) => state.hydrate)
  const isHydrated = useCart((state) => state.isHydrated)

  useEffect(() => {
    if (!isHydrated) {
      hydrate()
    }
  }, [isHydrated, hydrate])

  return isHydrated
}
