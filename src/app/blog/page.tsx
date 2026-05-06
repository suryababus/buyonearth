import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Earth Journal | Style & Fashion Blog",
  description: "Explore the Earth Journal — style guides, perfume tips, fashion trends, and luxury lifestyle content from Buy On Earth.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[#050505] py-16 text-center px-4">
        <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Our Blog</p>
        <h1 className="text-5xl font-bold text-white mb-4">Earth Journal</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Style guides, fragrance tips, fashion trends, and luxury lifestyle inspiration.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
            <div className="relative aspect-video rounded-3xl overflow-hidden">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>
          <div className="flex flex-col justify-center gap-4">
            <Badge variant="default" className="w-fit">{blogPosts[0].category}</Badge>
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <h2 className="text-3xl font-bold text-foreground hover:text-primary transition-colors">{blogPosts[0].title}</h2>
            </Link>
            <p className="text-muted-foreground leading-relaxed">{blogPosts[0].excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{blogPosts[0].author}</span>
              <span>·</span>
              <span>{blogPosts[0].publishDate}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="size-3" /> {blogPosts[0].readTime} min read</span>
            </div>
            <Link href={`/blog/${blogPosts[0].slug}`} className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all w-fit">
              Read Article <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <Separator className="mb-16" />

        {/* More Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 p-0">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <Badge variant="default" className="w-fit text-[10px]">{post.category}</Badge>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {post.readTime} min</span>
                      <span>{post.publishDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
