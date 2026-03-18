// Product image imports - 3 per category, cycled across products
import kids1 from "@/assets/products/kids-1.jpg";
import kids2 from "@/assets/products/kids-2.jpg";
import kids3 from "@/assets/products/kids-3.jpg";
import mensCasual1 from "@/assets/products/mens-casual-1.jpg";
import mensCasual2 from "@/assets/products/mens-casual-2.jpg";
import mensCasual3 from "@/assets/products/mens-casual-3.jpg";
import womensCasual1 from "@/assets/products/womens-casual-1.jpg";
import womensCasual2 from "@/assets/products/womens-casual-2.jpg";
import womensCasual3 from "@/assets/products/womens-casual-3.jpg";
import mensParty1 from "@/assets/products/mens-party-1.jpg";
import mensParty2 from "@/assets/products/mens-party-2.jpg";
import mensParty3 from "@/assets/products/mens-party-3.jpg";
import womensParty1 from "@/assets/products/womens-party-1.jpg";
import womensParty2 from "@/assets/products/womens-party-2.jpg";
import womensParty3 from "@/assets/products/womens-party-3.jpg";
import wedding1 from "@/assets/products/wedding-1.jpg";
import wedding2 from "@/assets/products/wedding-2.jpg";
import wedding3 from "@/assets/products/wedding-3.jpg";

const categoryImages: Record<string, string[]> = {
  "kids-boys": [kids1, kids2, kids3],
  "kids-girls": [kids1, kids2, kids3],
  "mens-casual": [mensCasual1, mensCasual2, mensCasual3],
  "mens-formal": [mensParty1, mensParty2, mensParty3],
  "mens-party": [mensParty1, mensParty2, mensParty3],
  "mens-ethnic": [mensParty1, mensParty2, mensParty3],
  "womens-casual": [womensCasual1, womensCasual2, womensCasual3],
  "womens-formal": [womensCasual1, womensCasual2, womensCasual3],
  "womens-party": [womensParty1, womensParty2, womensParty3],
  "womens-ethnic": [womensParty1, womensParty2, womensParty3],
  "wedding-bridal": [wedding1, wedding2, wedding3],
  "wedding-groom": [wedding1, wedding2, wedding3],
  "sarees": [womensParty1, womensParty2, womensParty3],
  "accessories": [wedding1, wedding2, wedding3],
};

export function getProductImage(categoryId: string, index: number): string {
  const images = categoryImages[categoryId];
  if (!images) return kids1;
  return images[index % images.length];
}
