import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Contact Us | Buy On Earth",
  description: "Get in touch with Buy On Earth customer support.",
}

const contactInfo = [
  { icon: Mail, title: "Email Us", value: "support@buyonearth.in", sub: "Available 24/7" },
  { icon: Phone, title: "Call Us", value: "+91 98765 43210", sub: "Mon–Sat, 9am–7pm" },
  { icon: MapPin, title: "Our Address", value: "Bengaluru, Karnataka, India", sub: "Not open to public visits" },
  { icon: Clock, title: "Response Time", value: "2-4 business hours", sub: "Usually faster" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[#050505] py-16 text-center px-4">
        <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">We're Here for You</p>
        <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Have a question, feedback, or need help? Our team is available to assist you.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We typically respond within 2-4 business hours. For urgent matters, please call us directly.
            </p>
            {contactInfo.map(({ icon: Icon, title, value, sub }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Full Name</Label>
                      <Input placeholder="Your full name" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email Address</Label>
                      <Input type="email" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">Order Issue</SelectItem>
                        <SelectItem value="product">Product Query</SelectItem>
                        <SelectItem value="return">Return / Exchange</SelectItem>
                        <SelectItem value="shipping">Shipping Query</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Message</Label>
                    <textarea
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background text-foreground focus:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring resize-none transition-colors placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button size="lg" variant="gold" type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
