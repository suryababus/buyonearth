import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Size Guide | Buy On Earth",
  description: "Find your perfect size with the Buy On Earth size guide for men, women, and children.",
}

const mensSizes = [
  { size: "XS", chest: "34-36", waist: "28-30", hip: "34-36" },
  { size: "S", chest: "36-38", waist: "30-32", hip: "36-38" },
  { size: "M", chest: "38-40", waist: "32-34", hip: "38-40" },
  { size: "L", chest: "40-42", waist: "34-36", hip: "40-42" },
  { size: "XL", chest: "42-44", waist: "36-38", hip: "42-44" },
  { size: "XXL", chest: "44-46", waist: "38-40", hip: "44-46" },
]

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[#050505] py-16 text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-4">Size Guide</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Find your perfect fit with our comprehensive size guide. All measurements are in inches.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-12">
        {/* AI Size Finder CTA */}
        <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20 text-center">
          <CardContent className="p-6 flex flex-col items-center gap-3">
            <Sparkles className="size-8 text-blue-500" />
            <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">Try AI Size Finder</p>
            <p className="text-muted-foreground text-sm">Get an instant size recommendation based on your measurements and preferred fit.</p>
            <Link href="/ai-stylist">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2 mt-1">Get AI Size Recommendation</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Men's Size Chart */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Men's Size Chart</h2>
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-foreground text-background">
                    {["Size", "Chest (in)", "Waist (in)", "Hip (in)"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mensSizes.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? "bg-muted/50" : "bg-background"}>
                      <td className="px-4 py-3 font-bold text-primary">{row.size}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.chest}"</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.waist}"</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.hip}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>How to Measure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <strong className="text-primary block mb-1">Chest</strong>
                Measure around the fullest part of your chest, keeping tape parallel to the ground.
              </div>
              <div>
                <strong className="text-primary block mb-1">Waist</strong>
                Measure around your natural waistline, above your hip bones.
              </div>
              <div>
                <strong className="text-primary block mb-1">Hip</strong>
                Measure around the fullest part of your hips, about 7-9" below your waistline.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
