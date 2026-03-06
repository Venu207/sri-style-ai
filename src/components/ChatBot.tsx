import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchProducts, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: Product[];
}

const suggestedQuestions = [
  "Suggest a party outfit for men",
  "Show me wedding sarees",
  "What casual wear do you have for women?",
  "Kids traditional wear suggestions",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to Sri Designs & Fashions! 👋 I'm your AI Fashion Stylist. Tell me about the occasion, your style preference, and I'll recommend the perfect outfit for you!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getRecommendations = (query: string): { text: string; products: Product[] } => {
    const q = query.toLowerCase();
    let searchTerms: string[] = [];

    if (q.includes("party") && q.includes("men")) searchTerms = ["blazer", "party", "suit", "silk shirt"];
    else if (q.includes("party") && q.includes("women")) searchTerms = ["cocktail", "gown", "party", "sequin"];
    else if (q.includes("wedding") || q.includes("bridal")) searchTerms = ["bridal", "wedding", "silk saree", "lehenga", "sherwani"];
    else if (q.includes("traditional")) searchTerms = ["saree", "kurta", "lehenga", "dhoti", "silk"];
    else if (q.includes("casual") && q.includes("men")) searchTerms = ["shirt", "jeans", "t-shirt", "casual"];
    else if (q.includes("casual") && q.includes("women")) searchTerms = ["kurti", "dress", "top", "casual"];
    else if (q.includes("kid")) searchTerms = ["kids", "frock", "kurta set"];
    else {
      const words = q.split(/\s+/).filter(w => w.length > 3);
      searchTerms = words.length > 0 ? words : ["popular"];
    }

    let results: Product[] = [];
    for (const term of searchTerms) {
      results = [...results, ...searchProducts(term)];
    }
    const unique = Array.from(new Map(results.map(p => [p.id, p])).values()).slice(0, 4);

    if (unique.length === 0) {
      return { text: "I couldn't find exact matches, but let me show you some of our popular items. Could you tell me more about what you're looking for? Like the occasion, your preferred style, and budget range?", products: searchProducts("designer").slice(0, 3) };
    }

    let text = "Based on your preferences, here are my top recommendations from our collection:\n\n";
    if (q.includes("party")) text = "For a stunning party look, I'd recommend these pieces:\n\n";
    if (q.includes("wedding")) text = "For the special day, here are our finest selections:\n\n";
    if (q.includes("casual")) text = "For effortless everyday style, check these out:\n\n";

    return { text, products: unique };
  };

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 800));

    const { text: responseText, products } = getRecommendations(msg);
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      products,
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] bg-background rounded-2xl shadow-2xl border border-border z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-dark p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center">
                  <Sparkles size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-cream">AI Fashion Stylist</h3>
                  <p className="text-[10px] text-cream/60">Sri Designs & Fashions</p>
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
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.products.map(p => (
                          <div key={p.id} className="bg-background/80 rounded-lg p-2.5 border border-border">
                            <div className="flex items-start justify-between gap-2">
                              <Link to={`/product/${p.id}`} onClick={() => setIsOpen(false)} className="flex-1 min-w-0">
                                <p className="font-display text-xs font-semibold truncate text-foreground hover:text-primary transition-colors">{p.name}</p>
                                <p className="text-[10px] text-muted-foreground">{p.department}</p>
                                <p className="font-semibold text-xs mt-1 text-foreground">₹{p.price.toLocaleString()}</p>
                              </Link>
                              <button
                                onClick={() => handleAddToCart(p)}
                                className="shrink-0 px-2 py-1 text-[10px] tracking-wider uppercase font-semibold bg-primary text-primary-foreground rounded hover:bg-gold-dark transition-colors"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
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
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
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
