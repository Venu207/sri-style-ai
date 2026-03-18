import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, ShoppingBag, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchProducts, allProducts, getComboProducts, getProductsByPriceRange, Product, comboSets } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: Product[];
  comboProducts?: { comboId: string; products: Product[] };
  booking?: { name: string; phone: string; address: string };
}

const suggestedQuestions = [
  "Suggest a party outfit for men",
  "Show me wedding sarees",
  "Book the best saree combo",
  "Kids traditional wear suggestions",
];

function parseResponse(text: string): {
  cleanText: string;
  products: Product[];
  comboProducts?: { comboId: string; products: Product[] };
  booking?: { name: string; phone: string; address: string };
} {
  let cleanText = text;
  let products: Product[] = [];
  let comboProducts: { comboId: string; products: Product[] } | undefined;
  let booking: { name: string; phone: string; address: string } | undefined;

  // Parse <products> tag
  const prodMatch = cleanText.match(/<products>(.*?)<\/products>/s);
  if (prodMatch) {
    cleanText = cleanText.replace(/<products>.*?<\/products>/s, "");
    try {
      const data = JSON.parse(prodMatch[1]);
      const searches: string[] = data.searches || [];
      const category: string | undefined = data.category;
      const minPrice: number | undefined = data.minPrice;
      const maxPrice: number | undefined = data.maxPrice;

      let results: Product[] = [];
      for (const term of searches) {
        const found = searchProducts(term);
        results.push(...(category ? found.filter(p => p.category === category) : found));
      }
      if (results.length === 0 && category) {
        results = allProducts.filter(p => p.category === category && !p.comboGroup);
      }
      if (minPrice !== undefined || maxPrice !== undefined) {
        results = getProductsByPriceRange(results, minPrice || 0, maxPrice || Infinity);
      }
      // Remove combo items from regular results
      results = results.filter(p => !p.comboGroup);
      products = Array.from(new Map(results.map(p => [p.id, p])).values()).slice(0, 6);
    } catch { /* ignore */ }
  }

  // Parse <combo> tag
  const comboMatch = cleanText.match(/<combo>(.*?)<\/combo>/s);
  if (comboMatch) {
    cleanText = cleanText.replace(/<combo>.*?<\/combo>/s, "");
    const comboId = comboMatch[1].trim();
    const items = getComboProducts(comboId);
    if (items.length > 0) {
      comboProducts = { comboId, products: items };
    }
  }

  // Parse <booking> tag
  const bookingMatch = cleanText.match(/<booking>(.*?)<\/booking>/s);
  if (bookingMatch) {
    cleanText = cleanText.replace(/<booking>.*?<\/booking>/s, "");
    try {
      booking = JSON.parse(bookingMatch[1]);
    } catch { /* ignore */ }
  }

  return { cleanText: cleanText.trim(), products, comboProducts, booking };
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to Sri Designs & Fashions! 👋 I'm your AI Fashion Stylist. Tell me about the occasion, your style preference, and budget — I'll recommend the perfect outfit for you!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const chatHistory = messages
        .filter(m => m.id !== "welcome")
        .map(m => ({ role: m.role, content: m.content }));
      chatHistory.push({ role: "user", content: msg });

      const { data, error } = await supabase.functions.invoke("fashion-chat", {
        body: { messages: chatHistory },
      });

      if (error) throw error;

      const responseContent = data?.content || "I'm sorry, I couldn't process that. Could you try rephrasing?";
      const { cleanText, products, comboProducts, booking } = parseResponse(responseContent);

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: cleanText,
        products,
        comboProducts,
        booking,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e: any) {
      console.error("Chat error:", e);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment! 🙏",
      };
      setMessages(prev => [...prev, errorMsg]);
      toast.error("Failed to get AI response");
    } finally {
      setIsTyping(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleAddComboToCart = (products: Product[]) => {
    products.forEach(p => addToCart(p));
    toast.success(`Complete combo set (${products.length} items) added to cart!`);
  };

  const handleBookCombo = (products: Product[]) => {
    products.forEach(p => addToCart(p));
    setIsOpen(false);
    navigate("/checkout");
  };

  const renderProductCard = (p: Product) => {
    const productIndex = parseInt(p.id.split("-").pop() || "1") - 1;
    const imageSrc = getProductImage(p.category, Math.abs(productIndex));
    return (
      <div key={p.id} className="bg-background/80 rounded-lg overflow-hidden border border-border">
        <div className="flex gap-2.5 p-2">
          <Link to={`/product/${p.id}`} onClick={() => setIsOpen(false)} className="shrink-0">
            <img src={imageSrc} alt={p.name} className="w-14 h-14 rounded-md object-cover" />
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={`/product/${p.id}`} onClick={() => setIsOpen(false)}>
              <p className="font-display text-xs font-semibold truncate text-foreground hover:text-primary transition-colors">{p.name}</p>
              <p className="text-[10px] text-muted-foreground">{p.department}</p>
              <p className="font-semibold text-xs text-foreground mt-1">₹{p.price.toLocaleString()}</p>
            </Link>
          </div>
          <button
            onClick={() => handleAddToCart(p)}
            className="shrink-0 self-center w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-gold-dark transition-colors"
          >
            <ShoppingBag size={12} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] bg-background rounded-2xl shadow-2xl border border-border z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-dark p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center">
                  <Sparkles size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-cream">AI Fashion Stylist</h3>
                  <p className="text-[10px] text-cream/60">Powered by AI • Sri Designs</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cream/60 hover:text-cream">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"} rounded-2xl px-4 py-2.5 text-sm`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Combo Set */}
                    {msg.comboProducts && (
                      <div className="mt-3 p-2.5 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Package size={14} className="text-primary" />
                          <p className="text-xs font-display font-semibold text-primary">Complete Combo Set</p>
                        </div>
                        <div className="space-y-1.5">
                          {msg.comboProducts.products.map(p => (
                            <div key={p.id} className="flex justify-between items-center text-xs">
                              <span className="truncate flex-1">{p.name}</span>
                              <span className="font-semibold ml-2">₹{p.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-primary/20 text-xs font-bold">
                          <span>Total</span>
                          <span>₹{msg.comboProducts.products.reduce((s, p) => s + p.price, 0).toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleAddComboToCart(msg.comboProducts!.products)}
                            className="flex-1 text-[10px] py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-gold-dark transition-colors font-medium"
                          >
                            Add All to Cart
                          </button>
                          <button
                            onClick={() => handleBookCombo(msg.comboProducts!.products)}
                            className="flex-1 text-[10px] py-1.5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Product cards */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.products.map(renderProductCard)}
                      </div>
                    )}

                    {/* Booking confirmation */}
                    {msg.booking && (
                      <div className="mt-3 p-2.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">📋 Booking Details</p>
                        <p className="text-[11px]">Name: {msg.booking.name}</p>
                        <p className="text-[11px]">Phone: {msg.booking.phone}</p>
                        <p className="text-[11px]">Address: {msg.booking.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestedQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[10px] px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border">
              <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask for outfit suggestions..."
                  className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-gold-dark transition-colors disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 md:right-6 w-14 h-14 rounded-full gradient-gold shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
      >
        {isOpen ? <X size={22} className="text-primary-foreground" /> : <MessageCircle size={22} className="text-primary-foreground" />}
      </motion.button>
    </>
  );
};

export default ChatBot;
