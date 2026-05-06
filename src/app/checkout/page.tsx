"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, CreditCard, Shield, Truck, CheckCircle2, MapPin, Package, ArrowLeft } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type Step = "shipping" | "payment" | "review"

const steps = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
]

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
  { id: "upi", label: "UPI", icon: "📱" },
  { id: "netbanking", label: "Net Banking", icon: "🏦" },
  { id: "wallet", label: "Wallet", icon: "👛" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
  { id: "emi", label: "EMI (0% interest)", icon: "📅" },
]

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState<Step>("shipping")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [shippingData, setShippingData] = useState({
    fullName: "", email: "", phone: "", address: "",
    city: "", state: "", pincode: "", country: "India",
  })

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 4999 ? 0 : 199
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  const stepIndex = steps.findIndex(s => s.id === currentStep)

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="size-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="size-12 text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you for your purchase. Your order has been placed successfully.</p>
          <p className="text-sm text-primary font-semibold mb-8">Order ID: BOE{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          <Card className="mb-8 text-left">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Package className="size-4 text-primary" />
                <span className="text-foreground">Estimated delivery: <strong>3-5 business days</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="size-4 text-primary" />
                <span className="text-foreground">Premium packaging with tracking</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Link href="/account/orders" className="flex-1">
              <Button size="lg" variant="outline" className="flex-1">Track Order</Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button size="lg" variant="gold" className="flex-1">Continue Shopping</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Link href="/"><Button variant="gold">Start Shopping</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="size-4" /> Back to Cart
            </Button>
          </Link>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div className={cn(
                    "flex items-center gap-2",
                    currentStep === step.id ? "text-foreground" : stepIndex > i ? "text-primary" : "text-muted-foreground"
                  )}>
                    <div className={cn(
                      "size-7 rounded-full flex items-center justify-center text-xs font-bold",
                      currentStep === step.id ? "bg-foreground text-background" :
                      stepIndex > i ? "bg-primary text-white" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {stepIndex > i ? "✓" : i + 1}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{step.label}</span>
                  </div>
                  {i < steps.length - 1 && <ChevronRight className="size-4 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Forms */}
          <div className="lg:col-span-3">
            {/* Shipping Step */}
            {currentStep === "shipping" && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="size-5 text-primary" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Full Name", key: "fullName", span: 2 },
                        { label: "Email Address", key: "email", span: 1 },
                        { label: "Phone Number", key: "phone", span: 1 },
                        { label: "Street Address", key: "address", span: 2 },
                        { label: "City", key: "city", span: 1 },
                        { label: "State", key: "state", span: 1 },
                        { label: "PIN Code", key: "pincode", span: 1 },
                        { label: "Country", key: "country", span: 1 },
                      ].map(({ label, key, span }) => (
                        <div key={key} className={span === 2 ? "sm:col-span-2" : ""}>
                          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">{label}</Label>
                          <Input
                            value={shippingData[key as keyof typeof shippingData]}
                            onChange={(e) => setShippingData(prev => ({ ...prev, [key]: e.target.value }))}
                            placeholder={label}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Delivery Method */}
                    <div>
                      <p className="text-sm font-bold text-foreground mb-3">Delivery Method</p>
                      <div className="flex flex-col gap-2">
                        {[
                          { id: "standard", label: "Standard Delivery", time: "5-7 business days", price: subtotal >= 4999 ? "Free" : "₹199" },
                          { id: "express", label: "Express Delivery", time: "2-3 business days", price: "₹349" },
                          { id: "overnight", label: "Next Day Delivery", time: "1 business day", price: "₹699" },
                        ].map(method => (
                          <label key={method.id} className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
                            <input type="radio" name="delivery" defaultChecked={method.id === "standard"} className="accent-[#C8A96A]" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{method.label}</p>
                              <p className="text-xs text-muted-foreground">{method.time}</p>
                            </div>
                            <span className="text-sm font-semibold text-primary">{method.price}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button onClick={() => setCurrentStep("payment")} size="lg" variant="gold" className="w-full gap-2">
                      Continue to Payment <ChevronRight className="size-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="size-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-3">
                      {paymentMethods.map(method => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={cn(
                            "flex items-center gap-2 p-3 border-2 rounded-xl text-sm font-medium transition-all",
                            paymentMethod === method.id
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground hover:border-muted-foreground"
                          )}
                        >
                          <span className="text-lg">{method.icon}</span>
                          <span className="text-left leading-tight">{method.label}</span>
                        </button>
                      ))}
                    </div>

                    {paymentMethod === "card" && (
                      <div className="flex flex-col gap-4 p-4 bg-muted rounded-2xl">
                        <div>
                          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Card Number</Label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Expiry</Label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">CVV</Label>
                            <Input placeholder="•••" />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="p-4 bg-muted rounded-2xl">
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">UPI ID</Label>
                        <Input placeholder="yourname@upi" />
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20">
                      <Shield className="size-4 text-green-500 shrink-0" />
                      Your payment information is encrypted and secure. We never store card details.
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={() => setCurrentStep("shipping")} size="lg" variant="outline" className="flex-1 gap-2">
                        <ArrowLeft className="size-4" /> Back
                      </Button>
                      <Button onClick={() => setCurrentStep("review")} size="lg" variant="gold" className="flex-1 gap-2">
                        Review Order <ChevronRight className="size-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Review Step */}
            {currentStep === "review" && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      {items.map(item => (
                        <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center gap-3">
                          <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                            <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground line-clamp-1">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">Size: {item.selectedSize} · Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold text-foreground">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button onClick={() => setCurrentStep("payment")} size="lg" variant="outline" className="flex-1 gap-2">
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  <Button onClick={() => { setOrderPlaced(true); clearCart() }} size="lg" variant="gold" className="flex-1 gap-2">
                    Place Order <CheckCircle2 className="size-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">Order Summary ({getTotalItems()} items)</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                      <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">{item.product.name} × {item.quantity}</span>
                      <span className="shrink-0 text-foreground font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>GST (5%)</span><span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-foreground">
                    <span>Total</span><span className="text-xl">{formatPrice(total)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                  {[
                    { icon: Shield, text: "256-bit SSL encryption" },
                    { icon: Truck, text: "Premium packaging included" },
                    { icon: CheckCircle2, text: "Authentic products guaranteed" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon className="size-3.5 text-primary" /> {text}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
