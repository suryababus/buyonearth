"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star, Sparkles, Eye } from "lucide-react"
import { Product } from "@/lib/data"
import { useCartStore, useWishlistStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Badge, getVariantFromBadge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem: addToCart } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const defaultSize = product.sizes?.[1] || product.sizes?.[0] || "One Size"
    const defaultColor = product.colors?.[0] || "Default"
    addToCart(product, defaultSize, defaultColor)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <motion.div
      className={cn("group relative", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[3/4]">
          <Image
            src={hovered && product.hoverImage ? product.hoverImage : product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80` }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badges.slice(0, 2).map((badge) => (
              <Badge key={badge} variant={getVariantFromBadge(badge)} />
            ))}
            {discount > 0 && (
              <Badge variant="destructive" className="font-bold">-{discount}%</Badge>
            )}
          </div>

          {/* AI Match Score */}
          {product.aiMatchScore && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
              <Sparkles className="size-2.5" />
              {product.aiMatchScore}%
            </div>
          )}

          {/* Action Buttons on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3 flex gap-2"
          >
            <Button
              onClick={handleAddToCart}
              size="sm"
              variant={addedToCart ? "default" : "secondary"}
              className={cn(
                "flex-1 text-xs font-semibold rounded-xl",
                addedToCart && "bg-green-500 text-white hover:bg-green-500"
              )}
            >
              <ShoppingBag className="size-3.5" />
              {addedToCart ? "Added!" : "Quick Add"}
            </Button>
            <Button size="icon" variant="secondary" className="rounded-xl size-9">
              <Eye className="size-4" />
            </Button>
          </motion.div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute p-2 rounded-xl backdrop-blur-sm transition-all duration-200",
              product.aiMatchScore ? "top-12 right-3" : "top-3 right-3",
              inWishlist
                ? "bg-destructive text-white"
                : "bg-background/80 text-muted-foreground hover:bg-destructive hover:text-white"
            )}
          >
            <Heart className={cn("size-4", inWishlist && "fill-current")} />
          </button>
        </div>

        {/* Product Info */}
        <div className="mt-3 px-1">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">{product.subcategory}</p>
            <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-3",
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color}
                  className="size-3.5 rounded-full border border-border"
                  style={{
                    backgroundColor: {
                      Black: "#050505",
                      White: "#FFFFFF",
                      "Earth Sand": "#D9C7A3",
                      "Soft Silver": "#D8D8D8",
                      Charcoal: "#151515",
                      Champagne: "#C8A96A",
                      Navy: "#1a237e",
                      "Deep Forest": "#102820",
                    }[color] || "#ccc",
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-muted-foreground">+{product.colors.length - 4}</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
