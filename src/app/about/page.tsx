import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Shield, Star, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "About Buy On Earth | Premium Fashion Brand",
  description: "Learn about Buy On Earth — our mission, values, and commitment to premium fashion and luxury perfumes.",
}

const values = [
  { icon: Leaf, title: "Sustainability", description: "GOTS-certified organic cotton, eco-friendly packaging, and responsible manufacturing." },
  { icon: Shield, title: "Authenticity", description: "Every product is authentic. We partner only with certified premium suppliers." },
  { icon: Star, title: "Quality First", description: "Rigorous quality checks ensure every piece meets our premium standards before shipping." },
  { icon: Globe, title: "Global Vision", description: "Indian premium fashion with global quality standards and worldwide aspirations." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative min-h-80 bg-[#050505] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80"
            alt="Buy On Earth"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Premium Fashion for a Future on Earth
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Buy On Earth was born from a vision — to create a fashion destination that combines timeless luxury with futuristic innovation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="text-4xl font-bold text-foreground mb-6">Luxury, Curated for Earth.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We believe that premium fashion should be accessible without compromising on quality. Every Buy On Earth piece is carefully designed, responsibly sourced, and crafted to last — because true luxury isn't disposable.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From premium menswear and elegant women's fashion to children's organic clothing and signature perfumes, we offer a complete premium lifestyle experience under one roof.
            </p>
            <Link href="/collections">
              <Button size="lg" variant="gold" className="gap-2">
                Explore Collections <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <Separator className="mb-20" />

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="p-6">
              <CardContent className="p-0">
                <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
