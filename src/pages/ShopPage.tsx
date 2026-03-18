import { useState, useMemo } from "react";
import { departments, allProducts, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹3,000", min: 1000, max: 3000 },
  { label: "₹3,000 – ₹8,000", min: 3000, max: 8000 },
  { label: "₹8,000 – ₹15,000", min: 8000, max: 15000 },
  { label: "Above ₹15,000", min: 15000, max: Infinity },
];

const genderGroups = [
  { label: "All", categories: [] },
  { label: "Men", categories: ["mens-casual", "mens-formal", "mens-party", "mens-ethnic"] },
  { label: "Women", categories: ["womens-casual", "womens-formal", "womens-party", "womens-ethnic", "sarees"] },
  { label: "Kids", categories: ["kids-boys", "kids-girls"] },
  { label: "Wedding", categories: ["wedding-bridal", "wedding-groom"] },
  { label: "Accessories", categories: ["accessories"] },
];

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = allProducts.filter(p => !p.comboGroup);

    // Gender group filter
    if (genderGroups[selectedGender].categories.length > 0) {
      results = results.filter(p => genderGroups[selectedGender].categories.includes(p.category));
    }

    // Department filter
    if (selectedDept) {
      results = results.filter(p => p.category === selectedDept);
    }

    // Price filter
    const price = priceRanges[selectedPrice];
    results = results.filter(p => p.price >= price.min && p.price <= price.max);

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }

    return results;
  }, [searchQuery, selectedDept, selectedGender, selectedPrice]);

  const visibleDepts = useMemo(() => {
    if (genderGroups[selectedGender].categories.length === 0) return departments;
    return departments.filter(d => genderGroups[selectedGender].categories.includes(d.id));
  }, [selectedGender]);

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">Shop All Collections</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse our extensive collection of {allProducts.filter(p => !p.comboGroup).length}+ products across {departments.length} categories
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for sarees, kurtas, blazers, dresses..."
              className="w-full bg-muted rounded-full pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-muted text-sm font-medium text-foreground hover:bg-muted/80 transition-colors lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Gender Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {genderGroups.map((g, i) => (
            <button
              key={g.label}
              onClick={() => { setSelectedGender(i); setSelectedDept(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedGender === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="flex gap-6 pb-20">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-60 shrink-0 space-y-6 ${showFilters ? "fixed inset-0 z-40 bg-background p-6 pt-20 overflow-auto lg:relative lg:inset-auto lg:z-auto lg:p-0 lg:pt-0" : ""}`}>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="lg:hidden absolute top-4 right-4 text-foreground">
                <X size={24} />
              </button>
            )}

            {/* Categories */}
            <div>
              <h3 className="font-display font-semibold text-sm text-foreground mb-3">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedDept(null)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedDept ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  All Categories
                </button>
                {visibleDepts.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDept(d.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedDept === d.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-display font-semibold text-sm text-foreground mb-3">Price Range</h3>
              <div className="space-y-1">
                {priceRanges.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setSelectedPrice(i)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedPrice === i ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredProducts.length} products
              {selectedDept && ` in ${departments.find(d => d.id === selectedDept)?.name}`}
            </p>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found</p>
                <p className="text-muted-foreground/60 text-sm mt-1">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
