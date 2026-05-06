"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight, Sparkles, Star, Shield, Leaf,
  Zap, Award, ChevronRight, Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product/ProductCard"
import {
  getNewArrivals, getBestSellers,
  collections, testimonials, products
} from "@/lib/data"

const categories = [
  {
    name: "Men",
    href: "/men",
    description: "Premium shirts, blazers, trousers & more",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  },
  {
    name: "Women",
    href: "/women",
    description: "Elegant dresses, tops, co-ord sets & more",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
  },
  {
    name: "Children",
    href: "/children",
    description: "Safe, organic & stylish kids' clothing",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
  },
  {
    name: "Perfume",
    href: "/perfume",
    description: "Signature scents & luxury fragrances",
    image: "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&q=80",
  },
]

const qualityFeatures = [
  { icon: Leaf, title: "Sustainable Sourcing", description: "Eco-conscious materials from certified suppliers worldwide." },
  { icon: Shield, title: "Quality Guaranteed", description: "Every piece passes rigorous quality checks before shipping." },
  { icon: Zap, title: "Fast Delivery", description: "Premium packaging with express delivery options available." },
  { icon: Award, title: "Award-Winning Design", description: "Fashion-forward designs recognized across the industry." },
]

export default function HomePage() {
  const newArrivals = getNewArrivals()
  const bestSellers = getBestSellers()
  const perfumes = products.filter(p => p.category === "Perfume").slice(0, 3)

  return (
    <div className="overflow-hidden">
      {/* ======================== HERO SECTION ======================== */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#050505] via-[#151515] to-[#102820] overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(rgba(200,169,106,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,106,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6"
              >
                <Sparkles className="size-4" />
                AI Style Assistant Now Live
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              >
                Premium Fashion for a{" "}
                <span className="text-gold-gradient">Future on Earth</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg"
              >
                Discover elevated clothing and signature perfumes crafted for men, women, and children.
                Designed with timeless quality, futuristic detail, and effortless luxury.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link href="/new-arrivals">
                  <Button size="lg" variant="gold" className="shadow-lg gap-2">
                    Shop New Arrivals <ArrowRight className="size-5" />
                  </Button>
                </Link>
                <Link href="/perfume">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black gap-2">
                    Explore Perfumes
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-8"
              >
                {[
                  { value: "50K+", label: "Happy Customers" },
                  { value: "4.9★", label: "Average Rating" },
                  { value: "500+", label: "Premium Products" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div className="text-xl font-bold text-white">{value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Floating Product Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[550px]">
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-10 right-10 h-96 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
                    alt="Premium Fashion Collection"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass rounded-2xl p-3">
                      <p className="text-white text-xs font-medium">✦ New Collection Drop</p>
                      <p className="text-primary text-sm font-bold mt-0.5">Earth Luxe 2026</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-16 left-0 glass rounded-2xl p-3 w-44 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-10 rounded-xl overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=100&q=80" alt="Perfume" width={40} height={40} className="object-cover" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">Earth Noir EDP</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="size-2.5 fill-primary text-primary" />
                        <span className="text-primary text-[10px]">4.9 (345)</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-4 right-0 glass rounded-2xl p-3 w-40 shadow-xl"
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="size-4 text-blue-400" />
                    <div>
                      <p className="text-white text-[10px] font-medium">AI Match Score</p>
                      <p className="text-blue-400 text-sm font-bold">96% ✓</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
          <span className="text-gray-500 text-[10px] uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ======================== CATEGORY CARDS ======================== */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Shop By Category</p>
            <h2 className="text-4xl font-bold text-foreground">
              Everything You Need,{" "}
              <span className="text-gold-gradient">All in One Place</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group block relative overflow-hidden rounded-3xl aspect-[3/4]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-gray-200 text-xs leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold">
                    Shop Now <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== NEW ARRIVALS ======================== */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Just Dropped</p>
              <h2 className="text-4xl font-bold text-foreground">New Arrivals</h2>
            </div>
            <Link href="/new-arrivals" className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
              View All <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================== AI STYLIST BANNER ======================== */}
      <section className="py-20 bg-gradient-to-br from-[#050505] via-[#0f1729] to-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/30 to-blue-600/10 border border-blue-500/20 p-8 lg:p-14 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium mb-5">
                  <Sparkles className="size-3.5" />
                  AI-Powered Shopping
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  Your Personal AI Stylist Has Arrived
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-8">
                  Get outfit suggestions, perfume recommendations, size guidance, and personalized product picks based on your style, occasion, and preferences.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/ai-stylist">
                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
                      <Sparkles className="size-5" />
                      Start Styling
                    </Button>
                  </Link>
                  <Link href="/ai-stylist" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors self-center">
                    <Play className="size-4" /> See How It Works
                  </Link>
                </div>
              </div>

              <div className="hidden lg:grid grid-cols-2 gap-3">
                {[
                  "Suggest outfit for wedding",
                  "Find black shirt under ₹3,000",
                  "Best evening perfume",
                  "Dress for 8-year-old birthday",
                ].map((prompt) => (
                  <div
                    key={prompt}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Sparkles className="size-4 text-blue-400 mb-2" />
                    <p className="text-white text-sm font-medium leading-snug">"{prompt}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== COLLECTIONS ======================== */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Curated For You</p>
            <h2 className="text-4xl font-bold text-foreground">Featured Collections</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.slice(0, 6).map((col) => (
              <Link key={col.id} href={`/collections/${col.slug}`} className="group block relative overflow-hidden rounded-3xl aspect-video">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-gray-300 text-xs mb-1">{col.productCount} pieces</p>
                  <h3 className="text-xl font-bold text-white mb-2">{col.name}</h3>
                  <p className="text-gray-300 text-xs line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold">
                    Explore <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== PERFUME HIGHLIGHT ======================== */}
      <section className="py-20 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">Signature Collection</p>
              <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                Signature Scents from Buy On Earth
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                Each fragrance in our collection tells a story. From bold evening oud to delicate floral daywear,
                discover perfumes crafted with the world's finest ingredients.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { label: "Top Notes", value: "Bergamot, Pink Pepper, Citrus" },
                  { label: "Heart Notes", value: "Rose, Saffron, Lavender" },
                  { label: "Base Notes", value: "Oud, Amber, Sandalwood, Musk" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="text-primary text-xs font-semibold w-24 shrink-0">{label}</span>
                    <Separator className="flex-1 bg-white/10" />
                    <span className="text-gray-300 text-xs">{value}</span>
                  </div>
                ))}
              </div>

              <Link href="/perfume">
                <Button size="lg" variant="gold" className="gap-2">
                  Explore Perfumes <ArrowRight className="size-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {perfumes.map((perfume, i) => (
                <div key={perfume.id} className={i === 1 ? "mt-8" : ""}>
                  <Link href={`/product/${perfume.slug}`} className="group block">
                    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-[#151515] mb-3">
                      <Image
                        src={perfume.images[0]}
                        alt={perfume.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-white text-xs font-semibold group-hover:text-primary transition-colors">{perfume.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">₹{perfume.price.toLocaleString("en-IN")}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================== BEST SELLERS ======================== */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Most Loved</p>
              <h2 className="text-4xl font-bold text-foreground">Best Sellers</h2>
            </div>
            <Link href="/best-sellers" className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
              View All <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================== QUALITY SECTION ======================== */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Our Promise</p>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Crafted for Earth.{" "}
              <span className="text-gold-gradient">Designed for Tomorrow.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every Buy On Earth piece is created with premium materials, refined fits, and a future-focused shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityFeatures.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="group p-6 hover:ring-primary/30 hover:shadow-lg transition-all duration-300 cursor-default"
              >
                <CardContent className="p-0">
                  <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Customer Stories</p>
            <h2 className="text-4xl font-bold text-foreground">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="size-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-4 italic">
                    "{t.review}"
                  </p>
                  <Separator className="mb-4" />
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full overflow-hidden bg-muted">
                      <Image src={t.avatar} alt={t.name} width={36} height={36} className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
