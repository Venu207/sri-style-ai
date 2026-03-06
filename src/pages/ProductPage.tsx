import { useParams, Link } from "react-router-dom";
import { getProductById, getProductsByDepartment } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ShoppingBag, ChevronRight, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const related = getProductsByDepartment(product.category).filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${product.category}`} className="hover:text-primary transition-colors">{product.department}</Link>
          <ChevronRight size={12} />
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-16"
        >
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
            <div className="w-full h-full gradient-gold opacity-30 flex items-center justify-center">
              <span className="text-8xl font-display font-bold text-primary-foreground/30">{product.name.charAt(0)}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs text-muted-foreground tracking-wider uppercase mb-2">{product.department}</p>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{product.name}</h1>
            <p className="text-3xl font-display font-bold text-primary mb-6">₹{product.price.toLocaleString()}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            <div className="flex items-center gap-2 mb-6">
              <span className={`w-3 h-3 rounded-full ${product.stock > 10 ? 'bg-emerald' : 'bg-burgundy'}`} />
              <span className="text-sm text-muted-foreground">
                {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
              </span>
            </div>

            <button onClick={handleAddToCart} className="btn-gold rounded-sm flex items-center justify-center gap-2 w-full md:w-auto">
              <ShoppingBag size={18} /> Add to Cart
            </button>

            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-border">
              <div className="text-center">
                <Truck size={20} className="mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Free Delivery</p>
              </div>
              <div className="text-center">
                <Shield size={20} className="mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Quality Assured</p>
              </div>
              <div className="text-center">
                <RotateCcw size={20} className="mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>
          </div>
        </motion.div>

        {related.length > 0 && (
          <section className="py-16 border-t border-border">
            <h2 className="text-2xl font-display font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
