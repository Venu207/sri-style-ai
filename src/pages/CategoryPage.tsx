import { useParams, Link } from "react-router-dom";
import { departments, getProductsByDepartment } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const department = departments.find(d => d.slug === slug);
  const deptId = department?.id || "";
  const products = getProductsByDepartment(deptId);

  if (!department) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{department.name}</span>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{department.name}</h1>
          <p className="text-muted-foreground">{department.description} · {products.length} products</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
