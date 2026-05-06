"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Heart, ShoppingBag, ArrowRight, Tag, Gift, Truck, Sparkles } from "lucide-react"
import { useCartStore, useWishlistStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { getFeaturedProducts } from "@/lib/data"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore()
  const { addItem: addToWishlist } = useWishlistStore()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)

  const subtotal = getTotalPrice()
  const discount = couponApplied ? Math.round(subtotal * 0.10) : 0
  const giftWrapCost = giftWrap ? 99 : 0
  const shippingThreshold = 4999
  const isFreeShipping = subtotal >= shippingThreshold
  const shippingCost = isFreeShipping ? 0 : 199
  const tax = Math.round((subtotal - discount) * 0.05)
  const total = subtotal - discount + shippingCost + giftWrapCost + tax
  const recommendedProducts = getFeaturedProducts().slice(0, 4)

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "EARTH10") setCouponApplied(true)
  }

  const handleMoveToWishlist = (item: typeof items[0]) => {
    addToWishlist(item.product)
    removeItem(item.product.id, item.selectedSize, item.selectedColor)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="size-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="size-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet. Start shopping to fill it with premium fashion.</p>
          <Link href="/">
            <Button size="lg" variant="gold" className="gap-2">
              Start Shopping <ArrowRight className="size-5" />
            </Button>
          </Link>
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">Popular Categories</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {["Men", "Women", "Children", "Perfume"].map(cat => (
                <Link key={cat} href={`/${cat.toLowerCase()}`}>
                  <Button variant="secondary" size="sm">{cat}</Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart</h1>
        <p className="text-muted-foreground text-sm mb-8">{getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your cart</p>

        {/* Free Shipping Progress */}
        {!isFreeShipping && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Truck className="size-4 text-primary" />
                  <span>Add <strong className="text-primary">{formatPrice(shippingThreshold - subtotal)}</strong> more for free premium shipping</span>
                </div>
                <span className="text-xs text-muted-foreground">{Math.min(100, Math.round((subtotal / shippingThreshold) * 100))}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {isFreeShipping && (
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm px-4 py-3 rounded-2xl mb-6 border border-green-100 dark:border-green-900/30">
            <Truck className="size-4" />
            You qualify for free premium shipping!
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex gap-4">
                        <Link href={`/product/${item.product.slug}`} className="shrink-0">
                          <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-muted">
                            <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                          </div>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs text-primary font-medium uppercase tracking-wide">{item.product.subcategory}</p>
                              <Link href={`/product/${item.product.slug}`}>
                                <h3 className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">{item.product.name}</h3>
                              </Link>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                              className="shrink-0 size-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            {item.selectedSize && <span>Size: <span className="font-medium text-foreground">{item.selectedSize}</span></span>}
                            {item.selectedColor && <span>Color: <span className="font-medium text-foreground">{item.selectedColor}</span></span>}
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-border rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                className="px-3 py-1.5 hover:bg-muted text-foreground transition-colors text-sm"
                              >−</button>
                              <span className="px-3 py-1.5 text-sm font-medium text-foreground border-x border-border">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                className="px-3 py-1.5 hover:bg-muted text-foreground transition-colors text-sm"
                              >+</button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-foreground">{formatPrice(item.product.price * item.quantity)}</p>
                              {item.quantity > 1 && <p className="text-xs text-muted-foreground">{formatPrice(item.product.price)} each</p>}
                            </div>
                          </div>

                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Heart className="size-3" /> Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* AI Recommendations */}
            <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="size-4 text-blue-500" />
                  <p className="text-sm font-semibold text-foreground">You might also like</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {recommendedProducts.map(p => (
                    <Link key={p.id} href={`/product/${p.slug}`} className="group">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <p className="text-xs font-medium text-foreground mt-1.5 line-clamp-1 group-hover:text-primary transition-colors">{p.name}</p>
                      <p className="text-xs text-primary">{formatPrice(p.price)}</p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {/* Coupon */}
                <div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={couponApplied}
                      variant="dark"
                      size="sm"
                      className="px-4"
                    >
                      Apply
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">✓ EARTH10 applied — 10% off</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Try: EARTH10 for 10% off</p>
                </div>

                <Separator />

                {/* Gift Wrap */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="accent-[#C8A96A] size-4"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <Gift className="size-4 text-primary" />
                    <span className="text-sm text-foreground">Premium Gift Wrap</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">+₹99</span>
                </label>

                <Separator />

                {/* Price Breakdown */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (EARTH10)</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  {giftWrap && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Gift Wrap</span>
                      <span>{formatPrice(giftWrapCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className={isFreeShipping ? "text-green-600" : ""}>{isFreeShipping ? "Free" : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>GST (5%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-xl">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full">
                  <Button size="lg" variant="gold" className="w-full gap-2 shadow-lg">
                    Proceed to Checkout <ArrowRight className="size-5" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-4">
                  <span className="text-[10px] text-muted-foreground">🔒 SSL Secure</span>
                  <span className="text-[10px] text-muted-foreground">✓ Easy Returns</span>
                  <span className="text-[10px] text-muted-foreground">⭐ Authentic</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
