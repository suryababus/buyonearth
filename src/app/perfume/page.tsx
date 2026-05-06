import type { Metadata } from "next"
import CategoryPage from "@/components/product/CategoryPage"
import { getProductsByCategory } from "@/lib/data"

export const metadata: Metadata = {
  title: "Luxury Perfumes Online | Signature Scents",
  description: "Shop luxury perfumes from Buy On Earth. Discover signature scents for men, women, and unisex.",
}

const perfumeSubcategories = [
  "Men's Perfume", "Women's Perfume", "Unisex Perfume",
  "Luxury Perfume", "Everyday Perfume", "Evening Perfume",
  "Gift Sets", "Travel Size"
]

export default function PerfumePage() {
  const products = getProductsByCategory("Perfume")
  return (
    <CategoryPage
      category="Perfume"
      title="Perfume"
      description="Discover our signature fragrance collection. From bold evening oud to delicate floral daywear, crafted from the world's finest ingredients."
      heroImage="https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=1400&q=80"
      products={products}
      subcategories={perfumeSubcategories}
    />
  )
}
