"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-muted/50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="size-10 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background text-sm font-bold">BE</span>
            </div>
            <div className="text-left">
              <div className="text-base font-bold tracking-wider uppercase text-foreground">Buy On Earth</div>
              <div className="text-[9px] tracking-[0.3em] text-primary uppercase -mt-0.5">Premium Fashion</div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isLogin ? "Sign in to access your Buy On Earth account" : "Join the Buy On Earth Circle today"}
          </p>
        </div>

        <Card>
          <CardContent className="p-8 flex flex-col gap-6">
            {/* Tab Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-border">
              {["Sign In", "Register"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setIsLogin(i === 0)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-all ${
                    (isLogin && i === 0) || (!isLogin && i === 1)
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form className="flex flex-col gap-4">
              {!isLogin && (
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Full Name</Label>
                  <Input placeholder="Your full name" />
                </div>
              )}
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Password</Label>
                  {isLogin && <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>}
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-11"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 size-7 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" size="lg" variant="gold" className="w-full">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {["Google", "Apple"].map(provider => (
                <Button key={provider} variant="outline" className="gap-2">
                  {provider === "Google" ? "🌐" : "🍎"} {provider}
                </Button>
              ))}
            </div>

            {isLogin && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-center border border-blue-100 dark:border-blue-900/20">
                <Sparkles className="size-5 text-blue-500 mx-auto mb-2" />
                <p className="text-xs text-blue-600 dark:text-blue-400">Sign in to unlock your AI Style Profile and personalized recommendations</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
