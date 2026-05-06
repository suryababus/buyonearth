import type { Metadata } from "next"
import CategoryPage from "@/components/product/CategoryPage"
import { getBestSellers } from "@/lib/data"

export const metadata: Metadata = {
  title: "Best Sellers | Most Loved Premium Fashion",
  description: "Shop the best-selling premium fashion products at Buy On Earth. Most loved by our customers.",
}

export default function BestSellersPage() {
  const products = getBestSellers()
  return (
    <CategoryPage
      category="Men"
      title="Best Sellers"
      description="Our most loved pieces, chosen by thousands of happy customers. The best of Buy On Earth."
      heroImage="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80"
      products={products}
      subcategories={["Men", "Women", "Children", "Perfume"]}
    />
  )
}
