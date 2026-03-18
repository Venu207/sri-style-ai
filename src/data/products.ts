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
  comboGroup?: string; // links combo items together
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const departments: Department[] = [
  { id: "kids-boys", name: "Boys Wear", slug: "boys-wear", description: "Trendy outfits for boys of all ages", image: "/category-kids" },
  { id: "kids-girls", name: "Girls Wear", slug: "girls-wear", description: "Beautiful dresses and ethnic wear for girls", image: "/category-kids" },
  { id: "mens-casual", name: "Men's Casual", slug: "mens-casual", description: "Everyday style for the modern man", image: "/category-mens-casual" },
  { id: "mens-formal", name: "Men's Formal", slug: "mens-formal", description: "Sharp and polished office & business wear", image: "/category-mens-party" },
  { id: "mens-party", name: "Men's Party Wear", slug: "mens-party", description: "Stand out at every celebration", image: "/category-mens-party" },
  { id: "mens-ethnic", name: "Men's Ethnic", slug: "mens-ethnic", description: "Traditional Indian wear for men", image: "/category-mens-party" },
  { id: "womens-casual", name: "Women's Casual", slug: "womens-casual", description: "Effortless elegance for daily wear", image: "/category-womens-casual" },
  { id: "womens-formal", name: "Women's Formal", slug: "womens-formal", description: "Professional attire for the working woman", image: "/category-womens-casual" },
  { id: "womens-party", name: "Women's Party Wear", slug: "womens-party", description: "Glamour for unforgettable nights", image: "/category-womens-party" },
  { id: "womens-ethnic", name: "Women's Ethnic", slug: "womens-ethnic", description: "Traditional Indian wear for women", image: "/category-womens-party" },
  { id: "wedding-bridal", name: "Bridal Collection", slug: "bridal-collection", description: "Stunning bridal ensembles for the big day", image: "/category-wedding" },
  { id: "wedding-groom", name: "Groom Collection", slug: "groom-collection", description: "Regal groom outfits for the special day", image: "/category-wedding" },
  { id: "sarees", name: "Sarees", slug: "sarees", description: "Exquisite sarees for every occasion", image: "/category-womens-party" },
  { id: "accessories", name: "Accessories", slug: "accessories", description: "Complete your look with our accessories", image: "/category-wedding" },
];

const colors = ["Red", "Blue", "Black", "White", "Green", "Navy", "Maroon", "Gold", "Pink", "Cream", "Sky Blue", "Beige", "Grey", "Yellow", "Orange", "Teal", "Peach", "Lavender", "Burgundy", "Olive", "Royal Blue", "Rust", "Ivory", "Coral", "Mint", "Charcoal", "Wine", "Mustard", "Plum", "Silver"];

const boysItems = [
  "Boys Kurta Set", "Boys Shirt & Jeans", "Boys Frock Coat", "Boys T-Shirt", "Boys Shorts Set",
  "Boys Dhoti Set", "Boys Party Blazer Set", "Boys Nehru Jacket Set", "Boys Indo Western", "Boys Jodhpuri Set",
  "Boys Sherwani", "Boys Cotton Shirt", "Boys Polo T-Shirt", "Boys Track Suit", "Boys Ethnic Jacket",
  "Boys Casual Jacket", "Boys Denim Set", "Boys Formal Suit", "Boys Pyjama Set", "Boys Hoodie Set",
  "Boys Pathani Suit", "Boys Angrakha Set", "Boys Waistcoat Set", "Boys Cargo Set", "Boys Linen Shirt"
];

const girlsItems = [
  "Girls Lehenga Choli", "Girls Frock", "Girls Salwar Set", "Girls Gown", "Girls Anarkali Dress",
  "Girls Pattu Pavadai", "Girls Half Saree", "Girls Sharara Set", "Girls Jumpsuit", "Girls Party Dress",
  "Girls Cotton Kurti", "Girls Palazzo Set", "Girls Tutu Dress", "Girls Maxi Dress", "Girls Ethnic Set",
  "Girls Top & Skirt", "Girls Floral Dress", "Girls Kaftan", "Girls Peplum Set", "Girls A-Line Frock",
  "Girls Churidar Set", "Girls Crop Top Set", "Girls Dungaree", "Girls Ruffle Dress", "Girls Fairy Gown"
];

const mensCasualItems = [
  "Cotton Casual Shirt", "Slim Fit Jeans", "Polo T-Shirt", "Chino Pants", "Linen Shirt",
  "Henley T-Shirt", "Cargo Shorts", "Denim Jacket", "Cotton Kurta", "Track Pants",
  "Casual Blazer", "V-Neck Sweater", "Oxford Shirt", "Joggers", "Mandarin Collar Shirt",
  "Checked Shirt", "Corduroy Pants", "Bomber Jacket", "Graphic T-Shirt", "Khaki Trousers",
  "Hooded Sweatshirt", "Crew Neck T-Shirt", "Cargo Pants", "Linen Trousers", "Half Sleeve Shirt"
];

const mensFormalItems = [
  "Formal White Shirt", "Slim Fit Trousers", "Business Suit", "Tie & Shirt Combo", "Formal Blazer",
  "Double Breasted Suit", "Dress Shirt", "Pleated Trousers", "Cufflink Shirt", "Pinstripe Suit",
  "Formal Vest", "French Cuff Shirt", "Tailored Pants", "Three Piece Suit", "Formal Overcoat",
  "Oxford Formal Shirt", "Slim Fit Blazer", "Herringbone Suit", "Formal Polo", "Executive Shirt",
  "Wool Blend Suit", "Formal Kurta", "Classic Fit Shirt", "Charcoal Trousers", "Windowpane Suit"
];

const mensPartyItems = [
  "Designer Blazer", "Formal Shirt", "Slim Fit Suit", "Party Wear Kurta", "Tuxedo Set",
  "Silk Shirt", "Waistcoat Set", "Bandhgala Suit", "Embroidered Kurta", "Velvet Blazer",
  "Designer Nehru Jacket", "Brocade Sherwani", "Party Jodhpuri", "Satin Shirt", "Indo-Western Set",
  "Sequin Blazer", "Printed Party Shirt", "Three Piece Suit", "Silk Kurta Pajama", "Designer Jacket",
  "Metallic Blazer", "Cocktail Suit", "Jacquard Shirt", "Embellished Jacket", "Mirror Work Kurta"
];

const mensEthnicItems = [
  "Classic Kurta Pajama", "Nehru Jacket Set", "Pathani Suit", "Dhoti Kurta Set", "Angrakha Kurta",
  "Achkan Set", "Jodhpuri Suit", "Silk Kurta Set", "Churidar Set", "Indo Western Sherwani",
  "Cotton Dhoti Set", "Bandi Jacket", "Lucknowi Kurta", "Khadi Kurta Set", "Festive Kurta",
  "Printed Ethnic Kurta", "Mandarin Kurta", "Sherwani Suit", "Ethnic Waistcoat", "Traditional Mundu Set",
  "Brocade Kurta", "Dupion Silk Set", "Peshawari Suit", "Chikankari Kurta", "Mirror Work Kurta"
];

const womensCasualItems = [
  "Cotton Kurti", "Palazzo Pants", "Straight Fit Kurta", "Denim Jeans", "Printed Top",
  "A-Line Kurti", "Culottes", "Wrap Dress", "Cotton Salwar Set", "Tunic Top",
  "Maxi Dress", "Embroidered Kurti", "Jeggings", "Cold Shoulder Top", "Kaftan",
  "Shirt Dress", "Peplum Top", "Wide Leg Pants", "Floral Kurti", "Cotton Jumpsuit",
  "Linen Kurti", "Boho Dress", "Off Shoulder Top", "Cigarette Pants", "Cotton Co-ord Set"
];

const womensFormalItems = [
  "Formal Blazer", "Pencil Skirt", "Trousers Set", "Office Kurti", "Formal Shirt",
  "Business Suit", "Formal Dress", "Tailored Pants", "Formal Blouse", "Power Suit",
  "Shift Dress", "Formal Midi Skirt", "Corporate Kurta", "Structured Blazer", "Formal Jumpsuit",
  "Wide Leg Formal Pants", "Sheath Dress", "Formal Palazzo Set", "Executive Blouse", "Formal A-Line Dress",
  "Crepe Formal Top", "Formal Culottes", "Box Pleat Skirt", "Formal Tunic", "Classic Trench Coat"
];

const womensPartyItems = [
  "Designer Saree", "Cocktail Dress", "Sequin Gown", "Party Wear Lehenga", "Anarkali Suit",
  "Shimmer Dress", "Embellished Saree", "Maxi Gown", "Designer Salwar Kameez", "Off-Shoulder Dress",
  "Banarasi Silk Saree", "Crop Top Lehenga", "Palazzo Suit", "Velvet Dress", "Net Saree",
  "Party Jumpsuit", "Georgette Saree", "Floor Length Gown", "Cape Dress", "Draped Saree",
  "One Shoulder Gown", "Ruffle Saree", "Mermaid Gown", "Sequin Jumpsuit", "Feather Trim Dress"
];

const womensEthnicItems = [
  "Anarkali Set", "Churidar Suit", "Sharara Set", "Gharara Set", "Patiala Suit",
  "Straight Suit Set", "Embroidered Salwar", "Lucknowi Chikan Set", "Bandhani Suit", "Block Print Suit",
  "Chanderi Silk Set", "Organza Suit", "Phulkari Suit", "Gota Patti Set", "Palazzo Suit Set",
  "Cotton Ethnic Set", "Festive Salwar Kameez", "Mirror Work Suit", "Thread Work Set", "Kashmiri Suit",
  "Banarasi Suit", "Tussar Silk Set", "Hand Painted Suit", "Zardozi Work Set", "Chiffon Ethnic Set"
];

const bridalItems = [
  "Bridal Silk Saree", "Designer Bridal Lehenga", "Kanjeevaram Bridal Saree", "Heavy Bridal Lehenga",
  "Reception Gown", "Bridal Anarkali", "Bridal Half Saree", "Zari Work Bridal Saree", "Banarasi Bridal Saree",
  "Heavy Embroidered Lehenga", "Temple Jewelry Saree", "Mysore Silk Bridal", "Designer Wedding Saree",
  "Gold Tissue Saree", "Bridal Sharara Set", "Velvet Bridal Lehenga", "Bridal Net Saree", "Pattu Bridal Saree",
  "Bridal Crop Top Lehenga", "Bridal Cape Gown", "Bridal Gharara", "Ivory Bridal Lehenga", "Bridal Palazzo Set",
  "Sequin Bridal Gown", "Bridal Mermaid Gown"
];

const groomItems = [
  "Wedding Sherwani", "Groom Achkan", "Groom Indo Western", "Groom Bandhgala", "Groom Jodhpuri Set",
  "Silk Groom Sherwani", "Velvet Groom Sherwani", "Groom Kurta Set", "Groom Three Piece", "Groom Tuxedo",
  "Brocade Groom Sherwani", "Embroidered Groom Set", "Groom Nehru Jacket Set", "Groom Pathani", "Reception Suit",
  "Groom Dhoti Set", "Groom Angrakha", "Designer Groom Sherwani", "Pearl Work Sherwani", "Zardozi Groom Set",
  "Mirror Groom Sherwani", "Gold Groom Sherwani", "Groom Waistcoat Set", "Groom Silk Kurta", "Royal Groom Sherwani"
];

const sareeItems = [
  "Kanjeevaram Silk Saree", "Banarasi Silk Saree", "Chanderi Saree", "Tussar Silk Saree", "Organza Saree",
  "Cotton Handloom Saree", "Linen Saree", "Georgette Saree", "Chiffon Saree", "Crepe Saree",
  "Patola Saree", "Bandhani Saree", "Ikat Saree", "Kalamkari Saree", "Kota Doria Saree",
  "Tant Saree", "Paithani Saree", "Pochampally Saree", "Bhagalpuri Saree", "Sambalpuri Saree",
  "Mysore Silk Saree", "Art Silk Saree", "Jamdani Saree", "Nauvari Saree", "Gadwal Saree"
];

const accessoryItems = [
  "Silk Dupatta", "Embroidered Stole", "Statement Necklace", "Jhumka Earrings", "Bangles Set",
  "Clutch Purse", "Potli Bag", "Maang Tikka", "Kamarbandh Waist Belt", "Brooch Pin",
  "Cufflinks Set", "Tie Pin Set", "Pocket Square", "Wedding Pagdi", "Bridal Chooda",
  "Oxidized Jewelry Set", "Pearl Necklace", "Temple Jewelry Set", "Kundan Set", "Nose Ring",
  "Anklet Set", "Hair Accessories Set", "Embroidered Mojari", "Bridal Jutti Set", "Kolhapuri Chappal"
];

// Combo sets
const comboSets: Record<string, { items: Array<{ name: string; category: string; price: number }>; description: string }> = {
  "bridal-saree-combo": {
    description: "Complete bridal saree ensemble with matching blouse and accessories",
    items: [
      { name: "Bridal Kanjeevaram Saree", category: "sarees", price: 18500 },
      { name: "Designer Bridal Blouse", category: "accessories", price: 4500 },
      { name: "Bridal Temple Jewelry Set", category: "accessories", price: 6500 },
      { name: "Bridal Silk Dupatta", category: "accessories", price: 2500 },
    ],
  },
  "wedding-lehenga-combo": {
    description: "Complete wedding lehenga set with matching jewelry",
    items: [
      { name: "Heavy Bridal Lehenga Choli", category: "wedding-bridal", price: 22000 },
      { name: "Bridal Kundan Jewelry Set", category: "accessories", price: 7500 },
      { name: "Bridal Embroidered Dupatta", category: "accessories", price: 3500 },
      { name: "Bridal Jutti & Clutch Set", category: "accessories", price: 3000 },
    ],
  },
  "groom-sherwani-combo": {
    description: "Complete groom sherwani set with accessories",
    items: [
      { name: "Royal Wedding Sherwani", category: "wedding-groom", price: 15000 },
      { name: "Groom Mojari Set", category: "accessories", price: 2500 },
      { name: "Wedding Pagdi & Kalgi", category: "accessories", price: 3500 },
      { name: "Groom Mala Set", category: "accessories", price: 1500 },
    ],
  },
  "party-saree-combo": {
    description: "Party-ready saree set with matching accessories",
    items: [
      { name: "Designer Party Saree", category: "sarees", price: 8500 },
      { name: "Embellished Party Blouse", category: "accessories", price: 2500 },
      { name: "Statement Clutch Bag", category: "accessories", price: 1800 },
      { name: "Chandelier Earrings Set", category: "accessories", price: 1200 },
    ],
  },
  "mens-party-combo": {
    description: "Complete men's party wear ensemble",
    items: [
      { name: "Designer Party Blazer", category: "mens-party", price: 6500 },
      { name: "Premium Dress Shirt", category: "mens-formal", price: 2200 },
      { name: "Designer Cufflinks & Tie", category: "accessories", price: 1500 },
      { name: "Leather Oxford Shoes", category: "accessories", price: 3500 },
    ],
  },
  "kids-festive-combo": {
    description: "Festive outfit combo for kids",
    items: [
      { name: "Kids Ethnic Kurta Set", category: "kids-boys", price: 1800 },
      { name: "Kids Ethnic Mojari", category: "accessories", price: 600 },
      { name: "Kids Dupatta/Stole", category: "accessories", price: 400 },
    ],
  },
};

const qualifiers = ["Premium", "Classic", "Elegant", "Designer", "Exclusive", "Luxury", "Royal", "Traditional", "Modern", "Trendy", "Stylish", "Handcrafted", "Exquisite", "Deluxe", "Signature", "Heritage", "Contemporary", "Artisan", "Bespoke", "Vintage", "Regal", "Festive", "Grand", "Supreme", "Elite"];

function generateProducts(items: string[], departmentId: string, priceRange: [number, number]): Product[] {
  const dept = departments.find(d => d.id === departmentId);
  return items.map((name, i) => {
    const qualifier = qualifiers[i % qualifiers.length];
    const price = Math.round((priceRange[0] + Math.random() * (priceRange[1] - priceRange[0])) / 50) * 50;
    return {
      id: `${departmentId}-${i + 1}`,
      name: `${qualifier} ${name}`,
      price,
      category: departmentId,
      department: dept?.name || "",
      description: `${qualifier} quality ${name.toLowerCase()}. Crafted with the finest materials for comfort and style. Perfect for any occasion.`,
      image: `https://images.unsplash.com/photo-${1550000000000 + i * 1000}?w=400&h=500&fit=crop`,
      stock: Math.floor(Math.random() * 20) + 5,
      tags: [qualifier.toLowerCase(), name.toLowerCase(), departmentId],
    };
  });
}

function generateComboProducts(): Product[] {
  const products: Product[] = [];
  let idx = 0;
  for (const [comboId, combo] of Object.entries(comboSets)) {
    for (const item of combo.items) {
      idx++;
      products.push({
        id: `combo-${comboId}-${idx}`,
        name: item.name,
        price: item.price,
        category: item.category,
        department: departments.find(d => d.id === item.category)?.name || "Combo",
        description: `${combo.description}. This is part of a curated combo set for a complete look.`,
        image: "",
        stock: 10,
        tags: [comboId, "combo", "set", item.category],
        comboGroup: comboId,
      });
    }
  }
  return products;
}

export const allProducts: Product[] = [
  ...generateProducts(boysItems, "kids-boys", [500, 3000]),
  ...generateProducts(girlsItems, "kids-girls", [500, 3500]),
  ...generateProducts(mensCasualItems, "mens-casual", [800, 3500]),
  ...generateProducts(mensFormalItems, "mens-formal", [1500, 6000]),
  ...generateProducts(mensPartyItems, "mens-party", [2000, 8000]),
  ...generateProducts(mensEthnicItems, "mens-ethnic", [1200, 6000]),
  ...generateProducts(womensCasualItems, "womens-casual", [600, 3000]),
  ...generateProducts(womensFormalItems, "womens-formal", [1200, 5000]),
  ...generateProducts(womensPartyItems, "womens-party", [1500, 12000]),
  ...generateProducts(womensEthnicItems, "womens-ethnic", [1500, 8000]),
  ...generateProducts(bridalItems, "wedding-bridal", [5000, 25000]),
  ...generateProducts(groomItems, "wedding-groom", [5000, 20000]),
  ...generateProducts(sareeItems, "sarees", [1500, 18000]),
  ...generateProducts(accessoryItems, "accessories", [300, 8000]),
  ...generateComboProducts(),
];

export function getProductsByDepartment(departmentId: string): Product[] {
  return allProducts.filter(p => p.category === departmentId && !p.comboGroup);
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

export function getComboProducts(comboGroup: string): Product[] {
  return allProducts.filter(p => p.comboGroup === comboGroup);
}

export function getProductsByPriceRange(products: Product[], min: number, max: number): Product[] {
  return products.filter(p => p.price >= min && p.price <= max);
}

export { comboSets };
