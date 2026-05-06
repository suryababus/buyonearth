"use client"

import Link from "next/link"
import {
  User, Package, Heart, MapPin, CreditCard,
  Star, Gift, RotateCcw, Sparkles, ChevronRight, LogIn
} from "lucide-react"
import { useWishlistStore, useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const accountSections = [
  { icon: Package, label: "My Orders", href: "/account/orders", description: "View and track your orders" },
  { icon: Heart, label: "My Wishlist", href: "/wishlist", description: "Your saved items" },
  { icon: MapPin, label: "Saved Addresses", href: "/account/addresses", description: "Manage delivery addresses" },
  { icon: Sparkles, label: "AI Style Profile", href: "/ai-stylist", description: "Your personalized style preferences" },
  { icon: Star, label: "Loyalty Points", href: "/account/loyalty", description: "Earth Circle membership & rewards" },
  { icon: Gift, label: "Gift Cards", href: "/account/gift-cards", description: "Your gift cards and store credits" },
  { icon: RotateCcw, label: "Returns", href: "/account/returns", description: "Track return requests" },
  { icon: CreditCard, label: "Payment Methods", href: "/account/payments", description: "Saved cards and payment options" },
]

const loyaltyTiers = ["Member", "Silver", "Gold", "Black"]

export default function AccountPage() {
  const wishlistCount = useWishlistStore(state => state.items.length)
  const cartCount = useCartStore(state => state.getTotalItems())

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col gap-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-16 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="size-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground">Welcome to Buy On Earth</h1>
                <p className="text-muted-foreground text-sm">Sign in to access your account</p>
              </div>
              <Link href="/login">
                <Button variant="gold" size="sm" className="gap-2">
                  <LogIn className="size-4" /> Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Wishlist", value: wishlistCount, href: "/wishlist" },
            { label: "Cart Items", value: cartCount, href: "/cart" },
            { label: "Orders", value: 0, href: "/account/orders" },
          ].map(({ label, value, href }) => (
            <Link key={label} href={href} className="group">
              <Card className="text-center p-4 hover:ring-primary/40 transition-all">
                <CardContent className="p-0">
                  <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Earth Circle Loyalty */}
        <Card className="bg-gradient-to-r from-[#050505] to-[#151515] border-primary/20 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Earth Circle</p>
                <h2 className="text-lg font-bold">Join Our Loyalty Program</h2>
                <p className="text-gray-400 text-xs mt-1">Earn points, get early access, exclusive offers</p>
              </div>
              <div className="text-right">
                <p className="text-primary text-xs font-medium">Start as</p>
                <p className="text-white font-bold">Earth Member</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {loyaltyTiers.map((tier, i) => (
                <div
                  key={tier}
                  className={`flex-1 text-center py-1.5 rounded-lg text-[10px] font-semibold ${
                    i === 0 ? "bg-primary text-primary-foreground" : "bg-white/5 text-gray-500"
                  }`}
                >
                  {tier}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {accountSections.map(({ icon: Icon, label, href, description }) => (
            <Link key={label} href={href} className="group">
              <Card className="hover:ring-primary/40 hover:shadow-md transition-all">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <Icon className="size-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
