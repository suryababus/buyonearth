import type { Metadata } from "next"
import CategoryPage from "@/components/product/CategoryPage"
import { getProductsByCategory } from "@/lib/data"

export const metadata: Metadata = {
  title: "Premium Men's Clothing Online",
  description: "Shop premium men's clothing from Buy On Earth. Discover shirts, blazers, trousers, and more.",
}

const menSubcategories = [
  "Shirts", "T-Shirts", "Polo Shirts", "Hoodies", "Sweatshirts",
  "Jackets", "Blazers", "Trousers", "Jeans", "Shorts",
  "Co-ord Sets", "Ethnic Wear", "Activewear", "Innerwear", "Accessories"
]

export default function MenPage() {
  const products = getProductsByCategory("Men")
  return (
    <CategoryPage
      category="Men"
      title="Men"
      description="Discover premium menswear crafted with the finest materials and futuristic design sensibility. From everyday essentials to formal elegance."
      heroImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80"
      products={products}
      subcategories={menSubcategories}
    />
  )
}
