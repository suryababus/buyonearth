import type { Metadata } from "next"
import CategoryPage from "@/components/product/CategoryPage"
import { getProductsByCategory } from "@/lib/data"

export const metadata: Metadata = {
  title: "Luxury Women's Fashion Online",
  description: "Shop luxury women's fashion from Buy On Earth. Discover dresses, tops, blazers, and more.",
}

const womenSubcategories = [
  "Dresses", "Tops", "Shirts", "T-Shirts", "Blouses", "Co-ord Sets",
  "Skirts", "Trousers", "Jeans", "Jackets", "Blazers",
  "Ethnic Wear", "Activewear", "Loungewear", "Accessories"
]

export default function WomenPage() {
  const products = getProductsByCategory("Women")
  return (
    <CategoryPage
      category="Women"
      title="Women"
      description="Explore our curated women's collection — from ethereal evening wear to sharp office essentials, all crafted with elevated luxury."
      heroImage="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80"
      products={products}
      subcategories={womenSubcategories}
    />
  )
}
