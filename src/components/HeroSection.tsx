import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBanner} alt="Sri Designs & Fashions" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 font-body font-medium">
            Exclusive Collection 2026
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-cream leading-tight mb-6">
            Elegance
            <br />
            <span className="text-gradient-gold">Redefined</span>
          </h1>
          <p className="text-cream/80 text-lg mb-8 font-body font-light leading-relaxed">
            Discover handcrafted fashion that celebrates tradition with a modern touch.
            From casual wear to bridal couture.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/category/wedding-traditional" className="btn-gold rounded-sm">
              Shop Collection
            </Link>
            <Link to="/category/womens-casual" className="btn-outline-gold rounded-sm border-cream/40 text-cream hover:bg-cream/10 hover:text-cream">
              Explore More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
