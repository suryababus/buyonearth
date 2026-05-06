import type { Metadata } from "next"
import { Inter, Geist } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import MobileNav from "@/components/layout/MobileNav"
import AIAssistant from "@/components/ai/AIAssistant"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Buy On Earth | Premium Fashion & Perfumes for Men, Women & Children",
    template: "%s | Buy On Earth"
  },
  description: "Shop Buy On Earth for premium men's clothing, women's fashion, children's wear, and luxury perfumes. Discover futuristic fashion, AI-powered styling, and elegant collections.",
  keywords: ["premium fashion", "luxury clothing", "perfumes", "men's fashion", "women's fashion", "children's clothing"],
  openGraph: {
    title: "Buy On Earth | Premium Fashion & Perfumes",
    description: "Premium fashion for a future on Earth. Luxury clothing and signature perfumes.",
    type: "website",
    url: "https://buyonearth.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy On Earth | Premium Fashion & Perfumes",
    description: "Premium fashion for a future on Earth.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={cn(inter.className, "bg-background text-foreground antialiased")}>
        <Header />
        <main className="pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
        <AIAssistant />
      </body>
    </html>
  )
}
