import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  const { addToCart } = useCart();
  const productIndex = parseInt(product.id.split("-").pop() || "1") - 1;
  const imageSrc = getProductImage(product.category, productIndex);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-muted mb-3">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-charcoal/0 transition-colors duration-300" />
          <button
            onClick={handleAdd}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gold-dark"
          >
            <ShoppingBag size={16} />
          </button>
          {product.stock < 10 && (
            <span className="absolute top-3 left-3 px-2 py-1 text-[10px] tracking-wider uppercase font-semibold bg-burgundy text-cream rounded-sm">
              Low Stock
            </span>
          )}
        </div>
        <div>
          <p className="text-xs text-muted-foreground tracking-wider uppercase mb-1">
            {product.department}
          </p>
          <h3 className="font-display text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="font-body font-semibold text-foreground mt-1">₹{product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
