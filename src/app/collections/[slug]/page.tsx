import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { collections, getProductsByCollection } from "@/lib/data"
import CategoryPage from "@/components/product/CategoryPage"

export function generateStaticParams() {
  return collections.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const collection = collections.find(c => c.slug === params.slug)
  if (!collection) return {}
  return {
    title: `${collection.name} | Premium Fashion Collection`,
    description: collection.description,
  }
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = collections.find(c => c.slug === params.slug)
  if (!collection) notFound()

  const products = getProductsByCollection(collection.name)
  const allProducts = products.length > 0 ? products : []

  return (
    <CategoryPage
      category="Men"
      title={collection.name}
      description={collection.description}
      heroImage={collection.image}
      products={allProducts}
      subcategories={["Men", "Women", "Children", "Perfume"]}
    />
  )
}
