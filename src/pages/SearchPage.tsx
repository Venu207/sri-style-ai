import { useState } from "react";
import { searchProducts, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.trim().length >= 2) {
      setResults(searchProducts(val));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-display font-bold mb-8">Search</h1>
        <div className="relative max-w-xl mb-10">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search for clothing, styles, categories..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30"
            autoFocus
          />
        </div>

        {results.length > 0 && (
          <p className="text-sm text-muted-foreground mb-6">{results.length} products found</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
          {results.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {query.length >= 2 && results.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No products found for "{query}"</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
