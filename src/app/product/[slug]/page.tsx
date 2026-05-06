import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { products, getProductBySlug, getRelatedProducts } from "@/lib/data"
import ProductDetailClient from "./ProductDetailClient"

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.seoTitle,
    description: product.seoDescription,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const relatedProducts = getRelatedProducts(product, 4)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
