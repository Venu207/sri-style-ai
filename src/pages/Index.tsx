import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { departments, allProducts } from "@/data/products";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featured = allProducts.filter(p => p.price > 3000).slice(0, 8);

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-2">Explore</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Our Collections</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {departments.map((dept, i) => (
              <CategoryCard key={dept.id} department={dept} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-2">Curated For You</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Featured Products</h2>
            </div>
            <Link to="/category/wedding-traditional" className="hidden md:flex items-center gap-2 text-sm text-primary hover:text-gold-dark transition-colors font-medium">
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-dark rounded-2xl p-12 md:p-16 text-center"
          >
            <p className="text-gold-light text-xs tracking-[0.3em] uppercase font-medium mb-3">AI Powered</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-cream mb-4">
              Meet Your Personal Fashion Stylist
            </h2>
            <p className="text-cream/60 max-w-lg mx-auto mb-8">
              Our AI stylist understands your preferences and recommends the perfect outfit
              from our collection. Try it now!
            </p>
            <p className="text-cream/40 text-sm">Click the chat icon in the bottom right corner →</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
