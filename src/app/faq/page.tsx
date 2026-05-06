"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    category: "Ordering",
    questions: [
      { q: "What payment methods do you accept?", a: "We accept Credit/Debit Cards, UPI, Net Banking, Wallets (Paytm, PhonePe, Google Pay), Cash on Delivery, EMI, and Buy Now Pay Later options." },
      { q: "Can I modify my order after placing it?", a: "Orders can be modified within 1 hour of placement. After that, the order goes into processing. Please contact our support team immediately." },
      { q: "Do you offer Cash on Delivery?", a: "Yes, COD is available for most pin codes in India. Additional ₹50 handling charge applies." },
    ]
  },
  {
    category: "Shipping",
    questions: [
      { q: "What is the free shipping threshold?", a: "Free premium shipping on all orders above ₹4,999. Standard shipping is ₹199 for orders below this amount." },
      { q: "How long does delivery take?", a: "Standard delivery: 5-7 business days. Express delivery: 2-3 business days. Next day delivery available for select pin codes." },
      { q: "Do you ship internationally?", a: "Currently we ship within India. International shipping is coming soon. Join our newsletter to be notified." },
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      { q: "What is your return policy?", a: "We offer a 30-day easy return policy for all unworn, unwashed items in original packaging with tags attached. Perfumes are non-returnable once opened." },
      { q: "How do I initiate a return?", a: "Log into your account, go to Orders, select the item, and click 'Return/Exchange'. Our team will arrange a pickup from your address." },
      { q: "When will I receive my refund?", a: "Refunds are processed within 5-7 business days after we receive the returned item. It may take 3-5 additional days to reflect in your account." },
    ]
  },
  {
    category: "Products",
    questions: [
      { q: "How do I find my size?", a: "Use our Size Guide on each product page. Our AI Size Finder can also recommend your best size based on your measurements." },
      { q: "Are your products authentic?", a: "Yes, 100%. All Buy On Earth products are authentic and sourced directly from our production partners. We never sell counterfeit items." },
      { q: "What is the longevity of your perfumes?", a: "Our EDPs last 8-12 hours, EDTs last 4-6 hours. Exact longevity depends on your skin type and application area." },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[#050505] py-16 text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Everything you need to know about shopping at Buy On Earth.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-12">
        {faqs.map(section => (
          <div key={section.category}>
            <h2 className="text-lg font-bold text-primary uppercase tracking-widest mb-4">{section.category}</h2>
            <Card>
              <CardContent className="px-6 py-0">
                <Accordion>
                  {section.questions.map(({ q, a }, i) => (
                    <AccordionItem key={q} value={`${section.category}-${i}`}>
                      <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary text-left">
                        {q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
