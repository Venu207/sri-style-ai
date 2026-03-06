export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  department: string;
  description: string;
  image: string;
  stock: number;
  tags: string[];
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const departments: Department[] = [
  { id: "kids", name: "Kids Wear", slug: "kids-wear", description: "Adorable outfits for your little ones", image: "/category-kids" },
  { id: "mens-casual", name: "Men's Casual", slug: "mens-casual", description: "Everyday style for the modern man", image: "/category-mens-casual" },
  { id: "womens-casual", name: "Women's Casual", slug: "womens-casual", description: "Effortless elegance for daily wear", image: "/category-womens-casual" },
  { id: "mens-party", name: "Men's Party Wear", slug: "mens-party", description: "Stand out at every celebration", image: "/category-mens-party" },
  { id: "womens-party", name: "Women's Party Wear", slug: "womens-party", description: "Glamour for unforgettable nights", image: "/category-womens-party" },
  { id: "wedding", name: "Wedding / Traditional", slug: "wedding-traditional", description: "Timeless elegance for your special day", image: "/category-wedding" },
];

const colors = ["Red", "Blue", "Black", "White", "Green", "Navy", "Maroon", "Gold", "Pink", "Cream", "Sky Blue", "Beige", "Grey", "Yellow", "Orange", "Teal", "Peach", "Lavender", "Burgundy", "Olive"];

const kidsItems = [
  "Kids Kurta Set", "Kids Lehenga", "Kids Frock", "Boys Shirt", "Boys Shorts",
  "Girls Salwar Set", "Kids Dhoti Set", "Kids Party Dress", "Boys Blazer Set", "Girls Gown",
  "Kids T-Shirt", "Kids Ethnic Jacket", "Girls Pattu Pavadai", "Boys Nehru Jacket", "Kids Jumpsuit",
  "Girls Anarkali", "Boys Jodhpuri Set", "Kids Sharara Set", "Boys Indo Western", "Girls Half Saree"
];

const mensCasualItems = [
  "Cotton Casual Shirt", "Slim Fit Jeans", "Polo T-Shirt", "Chino Pants", "Linen Shirt",
  "Henley T-Shirt", "Cargo Shorts", "Denim Jacket", "Cotton Kurta", "Track Pants",
  "Casual Blazer", "V-Neck Sweater", "Oxford Shirt", "Joggers", "Mandarin Collar Shirt",
  "Checked Shirt", "Corduroy Pants", "Bomber Jacket", "Graphic T-Shirt", "Khaki Trousers"
];

const womensCasualItems = [
  "Cotton Kurti", "Palazzo Pants", "Straight Fit Kurta", "Denim Jeans", "Printed Top",
  "A-Line Kurti", "Culottes", "Wrap Dress", "Cotton Salwar Set", "Tunic Top",
  "Maxi Dress", "Embroidered Kurti", "Jeggings", "Cold Shoulder Top", "Kaftan",
  "Shirt Dress", "Peplum Top", "Wide Leg Pants", "Floral Kurti", "Cotton Jumpsuit"
];

const mensPartyItems = [
  "Designer Blazer", "Formal Shirt", "Slim Fit Suit", "Party Wear Kurta", "Tuxedo Set",
  "Silk Shirt", "Waistcoat Set", "Bandhgala Suit", "Embroidered Kurta", "Velvet Blazer",
  "Designer Nehru Jacket", "Brocade Sherwani", "Party Jodhpuri", "Satin Shirt", "Indo-Western Set",
  "Sequin Blazer", "Printed Party Shirt", "Three Piece Suit", "Silk Kurta Pajama", "Designer Jacket"
];

const womensPartyItems = [
  "Designer Saree", "Cocktail Dress", "Sequin Gown", "Party Wear Lehenga", "Anarkali Suit",
  "Shimmer Dress", "Embellished Saree", "Maxi Gown", "Designer Salwar Kameez", "Off-Shoulder Dress",
  "Banarasi Silk Saree", "Crop Top Lehenga", "Palazzo Suit", "Velvet Dress", "Net Saree",
  "Party Jumpsuit", "Georgette Saree", "Floor Length Gown", "Cape Dress", "Draped Saree"
];

const weddingItems = [
  "Bridal Silk Saree", "Designer Lehenga Choli", "Kanjeevaram Saree", "Bridal Lehenga",
  "Wedding Sherwani", "Reception Gown", "Traditional Blouse", "Pattu Saree", "Zari Work Saree",
  "Banarasi Wedding Saree", "Heavy Embroidered Lehenga", "Silk Dhoti Set", "Bridal Anarkali",
  "Wedding Kurta Set", "Temple Jewelry Saree", "Mysore Silk Saree", "Designer Wedding Saree",
  "Traditional Mundu Set", "Bridal Half Saree", "Gold Tissue Saree"
];

function generateProducts(items: string[], departmentId: string, priceRange: [number, number]): Product[] {
  return items.map((name, i) => {
    const color = colors[i % colors.length];
    const price = Math.round((priceRange[0] + Math.random() * (priceRange[1] - priceRange[0])) / 50) * 50;
    return {
      id: `${departmentId}-${i + 1}`,
      name: `${color} ${name}`,
      price,
      category: departmentId,
      department: departments.find(d => d.id === departmentId)?.name || "",
      description: `Premium quality ${name.toLowerCase()} in beautiful ${color.toLowerCase()} color. Crafted with the finest materials for comfort and style. Perfect for any occasion.`,
      image: `https://images.unsplash.com/photo-${1550000000000 + i * 1000}?w=400&h=500&fit=crop`,
      stock: Math.floor(Math.random() * 20) + 5,
      tags: [color.toLowerCase(), name.toLowerCase(), departmentId],
    };
  });
}

export const allProducts: Product[] = [
  ...generateProducts(kidsItems, "kids", [500, 2500]),
  ...generateProducts(mensCasualItems, "mens-casual", [800, 3500]),
  ...generateProducts(womensCasualItems, "womens-casual", [600, 3000]),
  ...generateProducts(mensPartyItems, "mens-party", [2000, 8000]),
  ...generateProducts(womensPartyItems, "womens-party", [1500, 12000]),
  ...generateProducts(weddingItems, "wedding", [3000, 25000]),
];

export function getProductsByDepartment(departmentId: string): Product[] {
  return allProducts.filter(p => p.category === departmentId);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  );
}
