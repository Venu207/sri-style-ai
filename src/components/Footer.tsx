import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="gradient-dark text-cream/80">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-xl font-bold text-cream mb-4">Sri Designs & Fashions</h3>
          <p className="text-sm leading-relaxed text-cream/60">
            Your destination for premium fashion. From casual wear to bridal couture,
            we bring you handcrafted elegance.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream/10 transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream/10 transition-colors">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-cream tracking-wider uppercase mb-4">Collections</h4>
          <div className="space-y-2.5">
            {["Kids Wear", "Men's Casual", "Women's Casual", "Party Wear", "Wedding"].map(cat => (
              <Link key={cat} to={`/category/${cat.toLowerCase().replace(/['\s]/g, '-')}`} className="block text-sm hover:text-gold-light transition-colors">{cat}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-cream tracking-wider uppercase mb-4">Help</h4>
          <div className="space-y-2.5">
            {["Shipping Info", "Returns", "Size Guide", "Track Order"].map(item => (
              <a key={item} href="#" className="block text-sm hover:text-gold-light transition-colors">{item}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-cream tracking-wider uppercase mb-4">Contact</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0 text-gold-light" /><span>123 Fashion Street, Chennai, Tamil Nadu</span></div>
            <div className="flex items-center gap-2"><Phone size={14} className="shrink-0 text-gold-light" /><span>+91 98765 43210</span></div>
            <div className="flex items-center gap-2"><Mail size={14} className="shrink-0 text-gold-light" /><span>info@sridesigns.com</span></div>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 mt-12 pt-8 text-center text-xs text-cream/40">
        © 2026 Sri Designs & Fashions. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
