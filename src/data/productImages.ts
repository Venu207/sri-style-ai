// Product image imports - unique images per category
import kidsBoys1 from "@/assets/products/kids-boys-1.jpg";
import kidsBoys2 from "@/assets/products/kids-boys-2.jpg";
import kidsBoys3 from "@/assets/products/kids-boys-3.jpg";
import kidsGirls1 from "@/assets/products/kids-girls-1.jpg";
import kidsGirls2 from "@/assets/products/kids-girls-2.jpg";
import kidsGirls3 from "@/assets/products/kids-girls-3.jpg";
import mensCasual1 from "@/assets/products/mens-casual-1.jpg";
import mensCasual2 from "@/assets/products/mens-casual-2.jpg";
import mensCasual3 from "@/assets/products/mens-casual-3.jpg";
import mensFormal1 from "@/assets/products/mens-formal-1.jpg";
import mensFormal2 from "@/assets/products/mens-formal-2.jpg";
import mensFormal3 from "@/assets/products/mens-formal-3.jpg";
import mensParty1 from "@/assets/products/mens-party-1.jpg";
import mensParty2 from "@/assets/products/mens-party-2.jpg";
import mensParty3 from "@/assets/products/mens-party-3.jpg";
import mensEthnic1 from "@/assets/products/mens-ethnic-1.jpg";
import mensEthnic2 from "@/assets/products/mens-ethnic-2.jpg";
import mensEthnic3 from "@/assets/products/mens-ethnic-3.jpg";
import womensCasual1 from "@/assets/products/womens-casual-1.jpg";
import womensCasual2 from "@/assets/products/womens-casual-2.jpg";
import womensCasual3 from "@/assets/products/womens-casual-3.jpg";
import womensFormal1 from "@/assets/products/womens-formal-1.jpg";
import womensFormal2 from "@/assets/products/womens-formal-2.jpg";
import womensFormal3 from "@/assets/products/womens-formal-3.jpg";
import womensParty1 from "@/assets/products/womens-party-1.jpg";
import womensParty2 from "@/assets/products/womens-party-2.jpg";
import womensParty3 from "@/assets/products/womens-party-3.jpg";
import womensEthnic1 from "@/assets/products/womens-ethnic-1.jpg";
import womensEthnic2 from "@/assets/products/womens-ethnic-2.jpg";
import womensEthnic3 from "@/assets/products/womens-ethnic-3.jpg";
import wedding1 from "@/assets/products/wedding-1.jpg";
import wedding2 from "@/assets/products/wedding-2.jpg";
import wedding3 from "@/assets/products/wedding-3.jpg";
import sarees1 from "@/assets/products/sarees-1.jpg";
import sarees2 from "@/assets/products/sarees-2.jpg";
import sarees3 from "@/assets/products/sarees-3.jpg";
import accessories1 from "@/assets/products/accessories-1.jpg";
import accessories2 from "@/assets/products/accessories-2.jpg";
import accessories3 from "@/assets/products/accessories-3.jpg";

const categoryImages: Record<string, string[]> = {
  "kids-boys": [kidsBoys1, kidsBoys2, kidsBoys3],
  "kids-girls": [kidsGirls1, kidsGirls2, kidsGirls3],
  "mens-casual": [mensCasual1, mensCasual2, mensCasual3],
  "mens-formal": [mensFormal1, mensFormal2, mensFormal3],
  "mens-party": [mensParty1, mensParty2, mensParty3],
  "mens-ethnic": [mensEthnic1, mensEthnic2, mensEthnic3],
  "womens-casual": [womensCasual1, womensCasual2, womensCasual3],
  "womens-formal": [womensFormal1, womensFormal2, womensFormal3],
  "womens-party": [womensParty1, womensParty2, womensParty3],
  "womens-ethnic": [womensEthnic1, womensEthnic2, womensEthnic3],
  "wedding-bridal": [wedding1, wedding2, wedding3],
  "wedding-groom": [wedding1, wedding2, wedding3],
  "sarees": [sarees1, sarees2, sarees3],
  "accessories": [accessories1, accessories2, accessories3],
};

export function getProductImage(categoryId: string, index: number): string {
  const images = categoryImages[categoryId];
  if (!images) return kidsBoys1;
  return images[index % images.length];
}
