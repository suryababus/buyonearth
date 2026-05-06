import { cn } from "@/lib/utils"

interface BadgeProps {
  children?: React.ReactNode
  variant?: "new" | "bestseller" | "premium" | "limited" | "eco" | "ai" | "selling" | "sale" | "default" | "secondary" | "outline" | "destructive"
  className?: string
}

const badgeVariants: Record<string, string> = {
  new: "bg-[#102820] text-white border-transparent",
  bestseller: "bg-primary text-primary-foreground border-transparent",
  premium: "bg-foreground text-background border-transparent",
  limited: "bg-red-600 text-white border-transparent",
  eco: "bg-green-700 text-white border-transparent",
  ai: "bg-blue-600 text-white border-transparent",
  selling: "bg-orange-500 text-white border-transparent",
  sale: "bg-destructive text-white border-transparent",
  default: "bg-primary text-primary-foreground border-transparent",
  secondary: "bg-secondary text-secondary-foreground border-transparent",
  outline: "border-border text-foreground bg-transparent",
  destructive: "bg-destructive text-white border-transparent",
}

const badgeText: Record<string, string> = {
  new: "New",
  bestseller: "Best Seller",
  premium: "Premium",
  limited: "Limited Drop",
  eco: "Eco Packaged",
  ai: "AI Pick",
  selling: "Selling Fast",
  sale: "Sale",
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-semibold uppercase tracking-wide rounded border",
        badgeVariants[variant] ?? badgeVariants.default,
        className
      )}
    >
      {children || (variant && badgeText[variant] ? badgeText[variant] : "")}
    </span>
  )
}

export function getVariantFromBadge(badge: string): "new" | "bestseller" | "premium" | "limited" | "eco" | "ai" | "selling" | "sale" {
  const map: Record<string, "new" | "bestseller" | "premium" | "limited" | "eco" | "ai" | "selling" | "sale"> = {
    "New": "new",
    "Best Seller": "bestseller",
    "Premium": "premium",
    "Limited Drop": "limited",
    "Eco Packaged": "eco",
    "AI Pick": "ai",
    "Selling Fast": "selling",
    "Sale": "sale",
  }
  return map[badge] || "new"
}
