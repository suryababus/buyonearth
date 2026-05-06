import type { Metadata } from "next"
import CategoryPage from "@/components/product/CategoryPage"
import { getProductsByCategory } from "@/lib/data"

export const metadata: Metadata = {
  title: "Premium Children's Clothing Online",
  description: "Shop premium children's clothing from Buy On Earth. Safe, sustainable, and stylish.",
}

const childrenSubcategories = [
  "Boys", "Girls", "Baby", "T-Shirts", "Shirts", "Dresses",
  "Sets", "Pants", "Shorts", "Jackets", "Sleepwear",
  "Occasion Wear", "School Essentials"
]

export default function ChildrenPage() {
  const products = getProductsByCategory("Children")
  return (
    <CategoryPage
      category="Children"
      title="Children"
      description="Premium clothing for little ones. Made with GOTS-certified organic materials, safe dyes, and designs that kids will love."
      heroImage="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1400&q=80"
      products={products}
      subcategories={childrenSubcategories}
    />
  )
}
