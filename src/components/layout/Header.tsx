"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, ShoppingBag, Heart, User, Menu,
  Sparkles, Sun, Moon, ChevronRight, X
} from "lucide-react"
import { useCartStore, useWishlistStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const navLinks = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Children", href: "/children" },
  { label: "Perfume", href: "/perfume" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Collections", href: "/collections" },
  { label: "Sale", href: "/sale" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const cartItems = useCartStore(state => state.getTotalItems())
  const wishlistItems = useWishlistStore(state => state.items.length)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const isHomePage = pathname === "/"

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#050505] dark:bg-[#C8A96A] text-white text-center py-2 px-4 text-xs font-medium tracking-wider">
        ✦ Free premium shipping on orders above ₹4,999 ✦ AI Style Assistant now live ✦
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled || !isHomePage
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="size-8 bg-foreground rounded-sm flex items-center justify-center">
                <span className="text-background text-xs font-bold">BE</span>
              </div>
              <div>
                <div className="text-base font-bold tracking-wider uppercase text-foreground">
                  Buy On Earth
                </div>
                <div className="text-[9px] tracking-[0.3em] text-[#C8A96A] uppercase -mt-0.5">Premium Fashion</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-all duration-200 hover:text-primary relative group text-foreground",
                    pathname === link.href && "text-primary"
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-foreground"
              >
                <Search className="size-5" />
              </Button>

              {/* AI Assistant */}
              <Link href="/ai-stylist" className="hidden sm:flex">
                <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Sparkles className="size-5" />
                </Button>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Heart className="size-5" />
                  {wishlistItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 size-4 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Account */}
              <Link href="/account" className="hidden sm:flex">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <User className="size-5" />
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <ShoppingBag className="size-5" />
                  {cartItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 size-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="hidden sm:flex text-foreground"
              >
                {darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </Button>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-foreground"
              >
                <Menu className="size-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border bg-background overflow-hidden"
            >
              <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for products, collections, perfumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-muted border-0 focus-visible:ring-primary"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-7"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {["Black shirt", "Evening perfume", "Kids party dress", "Blazer for office"].map(term => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col h-full">
            {/* Sheet Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="size-8 bg-foreground rounded-sm flex items-center justify-center">
                  <span className="text-background text-xs font-bold">BE</span>
                </div>
                <div>
                  <div className="text-sm font-bold tracking-wider uppercase text-foreground">Buy On Earth</div>
                  <div className="text-[9px] tracking-[0.3em] text-primary uppercase -mt-0.5">Premium Fashion</div>
                </div>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              ))}
            </nav>

            <Separator />

            {/* Bottom Actions */}
            <div className="p-4 flex flex-col gap-2">
              <Link
                href="/ai-stylist"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles className="size-4" /> AI Stylist
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="size-4" /> Account
              </Link>
              <button
                onClick={() => { setDarkMode(!darkMode); setMobileMenuOpen(false) }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
              >
                {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
