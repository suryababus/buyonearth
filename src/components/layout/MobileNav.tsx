"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Sparkles, Heart, ShoppingBag } from "lucide-react"
import { useCartStore, useWishlistStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "AI Stylist", href: "/ai-stylist", icon: Sparkles },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Cart", href: "/cart", icon: ShoppingBag },
]

export default function MobileNav() {
  const pathname = usePathname()
  const cartItems = useCartStore(state => state.getTotalItems())
  const wishlistItems = useWishlistStore(state => state.items.length)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background border-t border-border safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          const count = href === "/cart" ? cartItems : href === "/wishlist" ? wishlistItems : 0
          const isAI = href === "/ai-stylist"

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all duration-200",
                isActive ? "text-primary" : isAI ? "text-blue-500" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon className="size-5" />
                {count > 0 && (
                  <span className={cn(
                    "absolute -top-1.5 -right-1.5 size-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center",
                    href === "/cart" ? "bg-primary" : "bg-destructive"
                  )}>
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
