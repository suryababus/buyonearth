"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "./data"

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size: string, color: string, quantity?: number) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  toggleItem: (product: Product) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(
          item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
        )
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({ items: [...items, { product, quantity, selectedSize: size, selectedColor: color }] })
        }
      },
      removeItem: (productId, size, color) => {
        set({ items: get().items.filter(item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)) })
      },
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color)
          return
        }
        set({
          items: get().items.map(item =>
            item.product.id === productId && item.selectedSize === size && item.selectedColor === color
              ? { ...item, quantity }
              : item
          )
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    { name: "buyonearth-cart" }
  )
)

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({ items: [...get().items, product] })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) })
      },
      isInWishlist: (productId) => get().items.some(item => item.id === productId),
      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      }
    }),
    { name: "buyonearth-wishlist" }
  )
)
