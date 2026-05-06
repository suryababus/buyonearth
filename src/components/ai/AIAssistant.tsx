"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const suggestedPrompts = [
  "Suggest an outfit for a wedding",
  "Find me a black shirt under ₹3,000",
  "Which perfume is best for evening?",
  "Suggest clothes for my 8-year-old",
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const aiResponses: Record<string, string> = {
  "wedding": "For a wedding, I recommend our **Orbit Tailored Blazer** (₹7,999) paired with **Signature Slim Trousers** in black. Complete the look with our **Earth Noir EDP** for a sophisticated scent. Style tip: Add pocket square for extra elegance. ✨",
  "black shirt": "Perfect choice! Our **Earth Luxe Oversized Shirt** at ₹2,999 is our top-rated black shirt. It features premium organic cotton, a relaxed fit, and mother-of-pearl buttons. Available in sizes XS-XXL with 4.8★ rating from 234 customers. 🖤",
  "evening perfume": "For evening, I recommend **Earth Noir EDP** — a sophisticated woody-amber fragrance with Bergamot, Saffron, and Oud. Longevity: 8-10 hours. Perfect for formal dinners and special occasions. 🌙 Also consider **Orbit Oud Intense** for an even bolder statement.",
  "8-year-old": "For an 8-year-old, check out our **Mini Earth Collection**! The **Little Orbit Hoodie** (₹1,799) is perfect for everyday wear, and the **Earth Kids Party Dress** (₹2,999) is ideal for special occasions. All made with GOTS-certified organic cotton. 🌱",
}

function getAIResponse(query: string): string {
  const q = query.toLowerCase()
  if (q.includes("wedding") || q.includes("formal")) return aiResponses["wedding"]
  if (q.includes("black") && q.includes("shirt")) return aiResponses["black shirt"]
  if (q.includes("evening") && (q.includes("perfume") || q.includes("scent"))) return aiResponses["evening perfume"]
  if (q.includes("child") || q.includes("kid") || q.includes("year-old")) return aiResponses["8-year-old"]
  return "I'm your personal AI Stylist! I can help you find the perfect outfit, perfume, or gift. Try asking me about specific occasions, budgets, or product types. What are you looking for today? ✨"
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your personal Buy On Earth AI Stylist. I can help you find the perfect outfit, perfume recommendation, size guidance, or gift suggestion. What can I help you with today? ✨"
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: messageText }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1200))

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(messageText)
    }
    setMessages(prev => [...prev, aiMsg])
    setLoading(false)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50"
          >
            <Button
              onClick={() => setOpen(true)}
              className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 rounded-full px-5 py-3 h-auto shadow-lg"
            >
              <Sparkles className="size-5" />
              <span className="text-sm font-semibold">AI Stylist</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 w-80 sm:w-96"
          >
            <Card className="overflow-hidden shadow-2xl ring-0 border border-border">
              {/* Header */}
              <CardHeader className="p-0">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8 bg-white/20">
                      <AvatarFallback className="bg-white/20 text-white">
                        <Sparkles className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm font-semibold">AI Style Assistant</p>
                      <p className="text-blue-100 text-xs">Powered by Buy On Earth</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    className="text-white/80 hover:text-white hover:bg-white/10 size-8"
                  >
                    <X className="size-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <ScrollArea className="h-72 p-4">
                  <div className="flex flex-col gap-3">
                    {messages.map(msg => (
                      <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                        <div className={cn(
                          "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-blue-500 text-white rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        )}>
                          {msg.role === "assistant"
                            ? msg.content.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                              )
                            : msg.content}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm">
                          <Loader2 className="size-4 text-blue-500 animate-spin" />
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>
                </ScrollArea>

                {/* Suggested Prompts */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="shrink-0 text-xs px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                      placeholder="Ask about style, size, perfumes..."
                      className="flex-1 h-9 bg-muted border-0 focus-visible:ring-blue-500 text-sm"
                    />
                    <Button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || loading}
                      size="icon"
                      className="size-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shrink-0"
                    >
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
