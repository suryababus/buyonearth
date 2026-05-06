"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Send, Loader2, ArrowRight, Shirt, ShoppingBag } from "lucide-react"
import { products } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  products?: typeof products
}

const examplePrompts = [
  { icon: "👔", text: "Suggest an outfit for a business meeting" },
  { icon: "🌙", text: "Best perfume for a romantic evening" },
  { icon: "👧", text: "Party dress for my 10-year-old daughter" },
  { icon: "🏖️", text: "Premium resort wear for men" },
  { icon: "💍", text: "Complete wedding guest outfit under ₹10,000" },
  { icon: "🎁", text: "Premium gift ideas for Father's Day" },
]

function getAIResponse(query: string): { content: string; matchedProducts: typeof products } {
  const q = query.toLowerCase()
  let content = ""
  let matchedProducts: typeof products = []

  if (q.includes("business") || q.includes("office") || q.includes("formal") || q.includes("meeting")) {
    content = `For a business meeting, here's my premium recommendation:\n\n**The Power Look:**\n• Start with the **Orbit Tailored Blazer** — precision-tailored in premium wool-polyester blend\n• Pair with **Signature Slim Trousers** in charcoal or black\n• A crisp **Premium Sand Linen Shirt** (white version) underneath\n• Finish with **Earth Noir EDP** — the sophistication lasts 8-10 hours\n\n💡 **Styling Tip:** A tonal outfit (all black/charcoal) projects authority. The Orbit Blazer's structured shoulders do the work for you.`
    matchedProducts = products.filter(p => ["m004", "m006", "p001"].includes(p.id))
  } else if (q.includes("evening") || q.includes("romantic") || q.includes("dinner") || q.includes("date")) {
    content = `For an evening occasion, here are my top picks:\n\n**The Evening Edit:**\n• **Earth Noir Eau De Parfum** — Bergamot, Saffron, and Oud create an irresistible trail\n• **Orbit Oud Intense** for a bolder statement — 10-12 hours longevity\n\n**For Her:** Luna Satin Evening Dress in Champagne — ethereal bias-cut satin that catches light beautifully\n**For Him:** Future Fit Black T-Shirt + Signature Slim Trousers in black — minimal and striking\n\n💡 **Scent Tip:** Apply perfume to pulse points — wrists, neck, and inner elbows. Don't rub; let it dry naturally.`
    matchedProducts = products.filter(p => ["p001", "p003", "w001", "m002"].includes(p.id))
  } else if (q.includes("child") || q.includes("kid") || q.includes("girl") || q.includes("boy") || q.includes("daughter") || q.includes("son")) {
    content = `For children's occasion wear, here's what I recommend:\n\n**For Girls:**\n• **Earth Kids Party Dress** — silk-cotton blend with organza overlay, machine washable despite its luxurious look\n• Available in White, Blush Pink, and Champagne\n\n**For Boys:**\n• **Little Orbit Hoodie** + premium slim joggers — stylish and comfortable\n• **Mini Earth Cotton Set** — GOTS-certified organic cotton, hypoallergenic\n\n💡 **Care Tip:** All our children's clothing uses safe, toxin-free dyes. Machine wash cold on gentle cycle.`
    matchedProducts = products.filter(p => ["c002", "c001", "c003"].includes(p.id))
  } else if (q.includes("wedding") || q.includes("guest")) {
    content = `For a wedding guest outfit, here's the perfect look:\n\n**Men's Wedding Guest:**\n• **Orbit Tailored Blazer** in Champagne Gold + white linen shirt + slim trousers\n• Fragrance: **Earth Noir EDP** — makes a lasting impression\n\n**Women's Wedding Guest:**\n• **Luna Satin Evening Dress** in Champagne — absolutely stunning\n• Or **Celeste Luxury Blazer** + wide-leg trousers for a power look\n• Fragrance: **Luna Bloom Parfum** — floral and radiant\n\n💡 **Style Rule:** For daytime weddings, opt for lighter colors. For evening, embrace deep tones and rich fabrics.`
    matchedProducts = products.filter(p => ["m004", "w001", "w004", "p001", "p002"].includes(p.id))
  } else if (q.includes("resort") || q.includes("beach") || q.includes("summer") || q.includes("vacation")) {
    content = `For premium resort and vacation wear:\n\n**Men's Resort Essentials:**\n• **Premium Sand Linen Shirt** — European linen breathes beautifully in heat\n• **Midnight Tech Hoodie** for cool evenings\n• Light chinos or premium shorts\n• Fragrance: **Solar Musk** — clean, fresh, perfect for warm weather\n\n**Women's Resort Picks:**\n• **Earth Muse Co-ord Set** in Earth Sand — effortlessly chic\n• Flowy midi dresses\n\n💡 **Packing Tip:** Linen is the ultimate travel fabric — wrinkles actually look intentional!`
    matchedProducts = products.filter(p => ["m003", "m005", "p004", "w002"].includes(p.id))
  } else if (q.includes("gift") || q.includes("father") || q.includes("birthday") || q.includes("anniversary")) {
    content = `**Premium Gift Ideas from Buy On Earth:**\n\n**For Him:**\n• **Earth Noir EDP** — luxury fragrance in stunning packaging (₹4,999)\n• **Orbit Oud Intense** — for the man who loves bold, lasting scents (₹5,999)\n• **Orbit Tailored Blazer** — a gift that elevates his entire wardrobe (₹7,999)\n\n**For Her:**\n• **Luna Bloom Parfum** — radiant floral signature scent (₹3,999)\n• **Luna Satin Evening Dress** — a truly special occasion piece (₹8,999)\n\n🎁 All Buy On Earth orders come with premium gift packaging. Add a personalized message at checkout!`
    matchedProducts = products.filter(p => ["p001", "p003", "m004", "p002", "w001"].includes(p.id))
  } else {
    content = `I'm your personal Buy On Earth AI Stylist! I can help you with:\n\n• **Outfit recommendations** for any occasion\n• **Perfume matching** based on your personality and occasion\n• **Size guidance** for the perfect fit\n• **Gift suggestions** for loved ones\n• **Budget-based shopping** across all categories\n\nTry asking me something like:\n• "What should I wear to a business dinner?"\n• "Best perfume for everyday office wear"\n• "Complete outfit for a wedding under ₹15,000"`
    matchedProducts = products.filter(p => p.isFeatured).slice(0, 3)
  }

  return { content, matchedProducts }
}

export default function AIStylistPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to your personal Buy On Earth AI Stylist! ✨\n\nI'm here to help you discover the perfect outfit, fragrance, or gift. Tell me about your occasion, budget, or style preferences, and I'll curate personalized recommendations just for you.\n\nWhat are you shopping for today?"
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: messageText }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    const { content, matchedProducts } = getAIResponse(messageText)
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content,
      products: matchedProducts.length > 0 ? matchedProducts : undefined
    }
    setMessages(prev => [...prev, aiMsg])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#050505] via-[#0f1729] to-[#050505] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Your Personal AI Stylist</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get outfit recommendations, perfume suggestions, size guidance, and personalized product picks — all powered by AI.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Example Prompts */}
        {messages.length <= 1 && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Try asking...</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => sendMessage(prompt.text)}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#151515] border border-gray-100 dark:border-gray-800 rounded-2xl text-left hover:border-[#C8A96A] hover:bg-[#C8A96A]/5 transition-all group"
                >
                  <span className="text-2xl">{prompt.icon}</span>
                  <span className="text-sm text-[#050505] dark:text-white font-medium leading-snug group-hover:text-[#C8A96A] transition-colors">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="space-y-6 mb-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-2xl ${msg.role === "user" ? "ml-12" : "mr-12"}`}>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-400">AI Stylist</span>
                  </div>
                )}
                <div className={`px-5 py-4 rounded-3xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#050505] dark:bg-white text-white dark:text-black rounded-br-sm"
                    : "bg-gray-50 dark:bg-[#151515] text-[#050505] dark:text-white rounded-bl-sm border border-gray-100 dark:border-gray-800"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="space-y-1">
                      {msg.content.split("\n").map((line, i) => {
                        if (!line.trim()) return <div key={i} className="h-1" />
                        // Render **bold** inline
                        const parts = line.split(/\*\*(.*?)\*\*/g)
                        return (
                          <p key={i}>
                            {parts.map((part, j) =>
                              j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
                            )}
                          </p>
                        )
                      })}
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>

                {/* Product Recommendations */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {msg.products.slice(0, 3).map((product) => (
                      <Link key={product.id} href={`/product/${product.slug}`} className="group">
                        <div className="bg-white dark:bg-[#151515] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-md transition-all hover:border-[#C8A96A]">
                          <div className="relative aspect-square">
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                          </div>
                          <div className="p-2.5">
                            <p className="text-xs font-semibold text-[#050505] dark:text-white line-clamp-2 leading-snug group-hover:text-[#C8A96A] transition-colors">{product.name}</p>
                            <p className="text-xs text-[#C8A96A] font-bold mt-1">{formatPrice(product.price)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#151515] border border-gray-100 dark:border-gray-800 px-5 py-4 rounded-3xl rounded-bl-sm ml-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="sticky bottom-4 lg:bottom-8">
          <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-700 rounded-2xl p-3 shadow-xl flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Ask about outfits, perfumes, sizes, or gift ideas..."
              rows={2}
              className="flex-1 text-sm bg-transparent focus:outline-none resize-none text-[#050505] dark:text-white placeholder-gray-400"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="p-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl transition-colors shrink-0"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  )
}
