"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart, ShoppingBag, Star, Share2, Shield, Truck,
  RotateCcw, Sparkles, ZoomIn, ChevronDown, ChevronRight
} from "lucide-react"
import { Product } from "@/lib/data"
import { useCartStore, useWishlistStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Badge, getVariantFromBadge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product/ProductCard"

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

function AccordionItem({ title, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 dark:border-gray-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-sm font-semibold text-[#050505] dark:text-white hover:text-[#C8A96A] transition-colors"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || product.sizes?.[0] || "")
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const colorMap: Record<string, string> = {
    Black: "#050505",
    White: "#FFFFFF",
    "Earth Sand": "#D9C7A3",
    "Soft Silver": "#D8D8D8",
    Charcoal: "#151515",
    Champagne: "#C8A96A",
    Navy: "#1a237e",
    "Deep Forest": "#102820",
    "Blush Pink": "#ffb6c1",
    Mint: "#98ff98",
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#050505] dark:hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/${product.category.toLowerCase()}`} className="hover:text-[#050505] dark:hover:text-white capitalize">
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#050505] dark:text-white truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left - Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 dark:bg-[#151515] group">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <button className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-black/50 rounded-xl backdrop-blur-sm hover:bg-white transition-colors">
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === i ? "border-[#C8A96A]" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-5">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.badges.map((badge) => (
                <Badge key={badge} variant={getVariantFromBadge(badge)} />
              ))}
              {product.aiMatchScore && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-blue-600 text-xs font-semibold">{product.aiMatchScore}% AI Match</span>
                </div>
              )}
            </div>

            {/* Name & Subtitle */}
            <div>
              <p className="text-xs text-[#C8A96A] font-semibold uppercase tracking-widest mb-1">{product.subcategory}</p>
              <h1 className="text-3xl font-bold text-[#050505] dark:text-white leading-tight">{product.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-[#C8A96A] text-[#C8A96A]" : "text-gray-200"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-[#050505] dark:text-white">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#050505] dark:text-white">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
                  <span className="text-sm font-semibold text-green-600">Save {formatPrice(product.compareAtPrice - product.price)}</span>
                </>
              )}
            </div>

            {/* Perfume-specific info */}
            {product.category === "Perfume" && (
              <div className="bg-gray-50 dark:bg-[#151515] rounded-2xl p-4 space-y-3">
                {product.fragranceFamily && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Fragrance Family</span>
                    <span className="font-medium text-[#050505] dark:text-white">{product.fragranceFamily}</span>
                  </div>
                )}
                {product.topNotes && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Top Notes</span>
                    <span className="font-medium text-[#050505] dark:text-white text-right">{product.topNotes.join(", ")}</span>
                  </div>
                )}
                {product.heartNotes && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Heart Notes</span>
                    <span className="font-medium text-[#050505] dark:text-white text-right">{product.heartNotes.join(", ")}</span>
                  </div>
                )}
                {product.baseNotes && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Base Notes</span>
                    <span className="font-medium text-[#050505] dark:text-white text-right">{product.baseNotes.join(", ")}</span>
                  </div>
                )}
                {product.longevity && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Longevity</span>
                    <span className="font-medium text-[#050505] dark:text-white">{product.longevity}</span>
                  </div>
                )}
                {product.concentration && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Concentration</span>
                    <span className="font-medium text-[#050505] dark:text-white">{product.concentration}</span>
                  </div>
                )}
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <p className="text-sm font-semibold text-[#050505] dark:text-white mb-2">
                  Color: <span className="text-[#C8A96A]">{selectedColor}</span>
                </p>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? "border-[#C8A96A] scale-110" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: colorMap[color] || "#ccc" }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-[#050505] dark:text-white">
                    Size: <span className="text-[#C8A96A]">{selectedSize}</span>
                  </p>
                  <Link href="/size-guide" className="text-xs text-[#C8A96A] hover:underline">Size Guide</Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        selectedSize === size
                          ? "border-[#050505] dark:border-white bg-[#050505] dark:bg-white text-white dark:text-black"
                          : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Size Recommendation */}
            {product.category !== "Perfume" && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  <span className="font-semibold">AI recommends Size M</span> — 91% confidence based on your profile
                </p>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-[#050505] dark:text-white">Qty:</p>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-[#151515] text-[#050505] dark:text-white transition-colors"
                >−</button>
                <span className="px-4 py-2 text-sm font-medium text-[#050505] dark:text-white border-x border-gray-200 dark:border-gray-700">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-[#151515] text-[#050505] dark:text-white transition-colors"
                >+</button>
              </div>
              <span className="text-xs text-gray-400">{product.stock} in stock</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className={`flex-1 ${addedToCart ? "bg-green-500 hover:bg-green-500" : ""}`}
              >
                <ShoppingBag className="w-5 h-5" />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </Button>
              <button
                onClick={() => toggleItem(product)}
                className={`p-3.5 rounded-xl border-2 transition-all ${
                  inWishlist
                    ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-500"
                    : "border-gray-200 dark:border-gray-700 text-gray-400 hover:border-red-400 hover:text-red-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
              </button>
              <button className="p-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-400 hover:text-[#050505] dark:hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <Button size="lg" variant="gold" className="w-full">
              Buy Now
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Shield, text: "Secure Payment" },
                { icon: Truck, text: "Free Shipping ₹4,999+" },
                { icon: RotateCcw, text: "Easy Returns" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-[#151515] rounded-xl text-center">
                  <Icon className="w-4 h-4 text-[#C8A96A]" />
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">{text}</span>
                </div>
              ))}
            </div>

            {/* Product Details Accordion */}
            <div className="space-y-0 pt-2">
              <AccordionItem title="Product Description">
                <p>{product.longDescription}</p>
              </AccordionItem>
              {product.material && (
                <AccordionItem title="Fabric & Material">
                  <p>Material: {product.material}</p>
                  {product.fit && <p className="mt-1">Fit: {product.fit}</p>}
                </AccordionItem>
              )}
              {product.care && (
                <AccordionItem title="Care Instructions">
                  <p>{product.care}</p>
                </AccordionItem>
              )}
              <AccordionItem title="Shipping & Returns">
                <p>Free standard shipping on orders above ₹4,999. Express delivery available. Easy 30-day returns for unworn items in original packaging.</p>
              </AccordionItem>
              <AccordionItem title="Sustainability">
                <p>Buy On Earth is committed to sustainable fashion. This product is packaged in eco-friendly materials and sourced from responsible suppliers.</p>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <p className="text-[#C8A96A] text-xs font-semibold uppercase tracking-widest mb-2">You May Also Like</p>
              <h2 className="text-3xl font-bold text-[#050505] dark:text-white">Similar Products</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
