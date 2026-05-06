"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react"
import { useWishlistStore, useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()

  const handleMoveToCart = (product: typeof items[0]) => {
    const defaultSize = product.sizes?.[1] || product.sizes?.[0] || "One Size"
    const defaultColor = product.colors?.[0] || "Default"
    addItem(product, defaultSize, defaultColor)
    removeItem(product.id)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="size-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="size-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">Save items you love by clicking the heart icon on any product.</p>
          <Link href="/">
            <Button size="lg" variant="gold" className="gap-2">
              Discover Products <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">My Wishlist</h1>
            <p className="text-muted-foreground text-sm">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">Continue Shopping</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          <AnimatePresence>
            {items.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 p-0">
                  <CardContent className="p-0">
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={(e) => { e.preventDefault(); removeItem(product.id) }}
                          className="absolute top-3 right-3 size-8 rounded-xl hover:bg-destructive hover:text-white transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => { e.preventDefault(); handleMoveToCart(product) }}
                            className="w-full gap-1.5 rounded-xl"
                          >
                            <ShoppingBag className="size-3.5" /> Add to Cart
                          </Button>
                        </div>
                      </div>
                    </Link>
                    <div className="p-3">
                      <p className="text-[10px] text-primary font-medium uppercase tracking-wide mb-0.5">{product.subcategory}</p>
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors leading-snug">{product.name}</h3>
                      </Link>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="font-bold text-foreground">{formatPrice(product.price)}</span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
                        )}
                      </div>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => handleMoveToCart(product)}
                        className="w-full mt-3 gap-1.5 hover:bg-primary hover:text-primary-foreground rounded-xl"
                      >
                        <ShoppingBag className="size-3" /> Move to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
