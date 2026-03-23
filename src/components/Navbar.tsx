import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop All", to: "/shop" },
  { label: "Men", to: "/category/mens-casual" },
  { label: "Women", to: "/category/womens-casual" },
  { label: "Kids", to: "/category/boys-wear" },
  { label: "Sarees", to: "/category/sarees" },
  { label: "Wedding", to: "/category/bridal-collection" },
  { label: "Orders", to: "/orders" },
];

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Sri Designs & Fashions" className="h-12 lg:h-14 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium tracking-wide text-foreground/80 hover:text-primary transition-colors uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/search" className="p-2 text-foreground/70 hover:text-primary transition-colors">
              <Search size={20} />
            </Link>
            {session ? (
              <button
                onClick={handleSignOut}
                className="p-2 text-foreground/70 hover:text-primary transition-colors"
                title="Sign out"
              >
                <LogOut size={20} />
              </button>
            ) : (
              <Link to="/auth" className="p-2 text-foreground/70 hover:text-primary transition-colors" title="Sign in">
                <User size={20} />
              </Link>
            )}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="lg:hidden p-2 text-foreground/70"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium tracking-wide text-foreground/80 hover:text-primary transition-colors uppercase py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
