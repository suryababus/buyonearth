"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X, Grid3X3, LayoutList } from "lucide-react"
import { Product, ProductCategory } from "@/lib/data"
import ProductCard from "./ProductCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface CategoryPageProps {
  category: ProductCategory
  title: string
  description: string
  heroImage: string
  products: Product[]
  subcategories: string[]
}

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "best-selling" },
  { label: "Highest Rated", value: "rating" },
]

const priceRanges = [
  { label: "Under ₹2,000", range: [0, 2000] },
  { label: "₹2,000 – ₹5,000", range: [2000, 5000] },
  { label: "₹5,000 – ₹10,000", range: [5000, 10000] },
  { label: "Above ₹10,000", range: [10000, 50000] },
]

function FilterSidebar({
  allSizes,
  selectedSizes,
  priceRange,
  selectedRating,
  toggleSize,
  setPriceRange,
  setSelectedRating,
}: {
  allSizes: string[]
  selectedSizes: string[]
  priceRange: number[]
  selectedRating: number | null
  toggleSize: (s: string) => void
  setPriceRange: (r: number[]) => void
  setSelectedRating: (r: number | null) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-3">Price Range</p>
        <div className="flex flex-col gap-1.5">
          {priceRanges.map(({ label, range }) => (
            <button
              key={label}
              onClick={() => setPriceRange(range)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                priceRange[0] === range[0] && priceRange[1] === range[1]
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      {allSizes.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-3">Size</p>
          <div className="flex flex-wrap gap-2">
            {allSizes.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                  selectedSizes.includes(size)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Rating */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-3">Rating</p>
        <div className="flex flex-col gap-1.5">
          {[4, 3, 2].map(rating => (
            <button
              key={rating}
              onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                selectedRating === rating
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {"★".repeat(rating)} & Above
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CategoryPage({ category, title, description, heroImage, products, subcategories }: CategoryPageProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const allSizes = useMemo(() => {
    const sizes = new Set<string>()
    products.forEach(p => p.sizes?.forEach(s => sizes.add(s)))
    return Array.from(sizes)
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    if (selectedSubcategory) {
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory)
    }
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => selectedSizes.some(s => p.sizes?.includes(s)))
    }
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (selectedRating) {
      filtered = filtered.filter(p => p.rating >= selectedRating)
    }
    switch (sortBy) {
      case "price-asc": filtered.sort((a, b) => a.price - b.price); break
      case "price-desc": filtered.sort((a, b) => b.price - a.price); break
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break
      case "best-selling": filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break
      case "newest": filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)); break
    }
    return filtered
  }, [products, selectedSubcategory, selectedSizes, priceRange, sortBy, selectedRating])

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  const clearFilters = () => {
    setSelectedSubcategory(null)
    setSelectedSizes([])
    setPriceRange([0, 20000])
    setSelectedRating(null)
  }

  const activeFilterCount =
    (selectedSubcategory ? 1 : 0) +
    selectedSizes.length +
    (selectedRating ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="text-foreground font-medium">{title}</span>
          </nav>
        </div>
      </div>

      {/* Category Hero */}
      <div className="relative h-60 lg:h-80 overflow-hidden">
        <Image src={heroImage} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Buy On Earth</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Premium {title}'s Collection</h1>
              <p className="text-gray-200 text-sm max-w-lg">{description}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="border-b border-border bg-background sticky top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={cn(
                "shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                !selectedSubcategory
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All
            </button>
            {subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub === selectedSubcategory ? null : sub)}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                  selectedSubcategory === sub
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            {/* Filters Sheet (mobile + desktop) */}
            <Sheet>
              <SheetTrigger
                className="inline-flex items-center gap-2 h-7 px-2.5 text-sm font-medium border border-border rounded-lg bg-background hover:bg-muted transition-colors"
              >
                <SlidersHorizontal className="size-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="inline-flex size-5 items-center justify-center text-[10px] font-bold rounded-full bg-primary text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent side="left" className="w-72 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar
                    allSizes={allSizes}
                    selectedSizes={selectedSizes}
                    priceRange={priceRange}
                    selectedRating={selectedRating}
                    toggleSize={toggleSize}
                    setPriceRange={setPriceRange}
                    setSelectedRating={setSelectedRating}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive gap-1 h-7">
                <X className="size-3" /> Clear all
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "grid" ? "bg-foreground text-background" : "text-muted-foreground"
                )}
              >
                <Grid3X3 className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "list" ? "bg-foreground text-background" : "text-muted-foreground"
                )}
              >
                <LayoutList className="size-4" />
              </button>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(v) => v && setSortBy(v)}>
              <SelectTrigger className="w-44 h-9 text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">No products found</p>
            <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
          </div>
        ) : (
          <div className={cn(
            "grid gap-4 lg:gap-6",
            viewMode === "grid"
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          )}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
