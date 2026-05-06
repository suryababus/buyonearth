import Link from "next/link"
import { Share2, MessageCircle, Globe, Play, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  shop: [
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "Children", href: "/children" },
    { label: "Perfume", href: "/perfume" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Collections", href: "/collections" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Track Order", href: "/account/orders" },
    { label: "Contact Us", href: "/contact" },
    { label: "Store Locator", href: "/stores" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Earth Journal", href: "/blog" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "AI Style Assistant", href: "/ai-stylist" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
}

const paymentIcons = ["Visa", "Mastercard", "UPI", "RazorPay", "PayPal", "GPay"]

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Join the Buy On Earth Circle</h3>
              <p className="text-muted-foreground text-sm">Get early access to premium drops, private offers, and AI-curated recommendations.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="lg:w-72 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-primary focus-visible:border-primary"
              />
              <Button variant="gold" className="whitespace-nowrap gap-2">
                Join Now <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 bg-white rounded-sm flex items-center justify-center">
                <span className="text-black text-xs font-bold">BE</span>
              </div>
              <div>
                <div className="text-sm font-bold tracking-wider uppercase">Buy On Earth</div>
                <div className="text-[9px] tracking-[0.3em] text-primary uppercase -mt-0.5">Premium Fashion</div>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed mb-6">
              Premium fashion for a future on Earth. Luxury clothing and signature perfumes for men, women, and children.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Share2, href: "#" },
                { icon: MessageCircle, href: "#" },
                { icon: Globe, href: "#" },
                { icon: Play, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="size-8 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Shop</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.shop.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.support.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Legal</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.legal.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © 2026 Buy On Earth. All rights reserved. Premium Fashion for a Future on Earth.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {paymentIcons.map((icon) => (
              <span key={icon} className="px-2 py-1 bg-white/10 rounded text-xs text-muted-foreground font-medium">
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
