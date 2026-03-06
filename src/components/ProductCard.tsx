import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Props {
  product: Product;
  index?: number;
}

const colorSwatches: Record<string, string> = {
  red: "bg-red-500", blue: "bg-blue-500", black: "bg-gray-900", white: "bg-white border",
  green: "bg-green-600", navy: "bg-blue-900", maroon: "bg-red-900", gold: "bg-yellow-500",
  pink: "bg-pink-400", cream: "bg-amber-50 border", "sky blue": "bg-sky-400",
  beige: "bg-amber-100 border", grey: "bg-gray-400", yellow: "bg-yellow-400",
  orange: "bg-orange-500", teal: "bg-teal-500", peach: "bg-orange-200 border",
  lavender: "bg-purple-300", burgundy: "bg-red-800", olive: "bg-green-800",
};

const ProductCard = ({ product, index = 0 }: Props) => {
  const { addToCart } = useCart();
  const colorTag = product.tags[0];

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
          <div className="absolute inset-0 flex items-center justify-center gradient-gold opacity-20">
            <span className="text-6xl font-display font-bold text-primary-foreground/30">
              {product.name.charAt(0)}
            </span>
          </div>
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
          <div className="flex items-center justify-between mt-1">
            <p className="font-body font-semibold text-foreground">₹{product.price.toLocaleString()}</p>
            {colorTag && colorSwatches[colorTag] && (
              <span className={`w-3 h-3 rounded-full ${colorSwatches[colorTag]}`} />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
