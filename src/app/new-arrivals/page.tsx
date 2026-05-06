import type { Metadata } from "next"
import CategoryPage from "@/components/product/CategoryPage"
import { getNewArrivals } from "@/lib/data"

export const metadata: Metadata = {
  title: "New Arrivals | Latest Premium Fashion",
  description: "Discover the latest premium fashion arrivals at Buy On Earth. Fresh drops in clothing and perfumes.",
}

export default function NewArrivalsPage() {
  const products = getNewArrivals()
  return (
    <CategoryPage
      category="Men"
      title="New Arrivals"
      description="The latest premium drops from Buy On Earth. Fresh styles across men's, women's, children's clothing and perfumes."
      heroImage="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80"
      products={products}
      subcategories={["Men", "Women", "Children", "Perfume"]}
    />
  )
}
