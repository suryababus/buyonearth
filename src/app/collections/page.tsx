import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { collections } from "@/lib/data"

export const metadata: Metadata = {
  title: "Collections | Premium Fashion Collections",
  description: "Explore premium fashion collections from Buy On Earth. Curated styles for every occasion.",
}

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      <div className="bg-[#050505] py-16 px-4 text-center">
        <p className="text-[#C8A96A] text-xs font-semibold uppercase tracking-widest mb-3">Curated For You</p>
        <h1 className="text-5xl font-bold text-white mb-4">Our Collections</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Discover premium fashion collections crafted for every occasion, season, and style preference.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col) => (
            <Link key={col.id} href={`/collections/${col.slug}`} className="group block">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-gray-300 text-xs mb-1">{col.productCount} pieces</p>
                  <h2 className="text-xl font-bold text-white">{col.name}</h2>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3">{col.description}</p>
              <span className="flex items-center gap-2 text-[#C8A96A] text-sm font-semibold group-hover:gap-3 transition-all">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
