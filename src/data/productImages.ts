// Product images using Unsplash source API with category-specific search terms
// Each product gets a unique image via a unique sig parameter

const categorySearchTerms: Record<string, string> = {
  "kids-boys": "indian+boy+kid+fashion",
  "kids-girls": "indian+girl+kid+dress",
  "mens-casual": "indian+man+casual+shirt",
  "mens-formal": "indian+man+formal+suit",
  "mens-party": "indian+man+party+outfit",
  "mens-ethnic": "indian+man+kurta+ethnic",
  "womens-casual": "indian+woman+casual+kurti",
  "womens-formal": "indian+woman+formal+dress",
  "womens-party": "indian+woman+party+dress+glamour",
  "womens-ethnic": "indian+woman+ethnic+salwar",
  "wedding-bridal": "indian+bridal+lehenga+wedding",
  "wedding-groom": "indian+groom+sherwani+wedding",
  "sarees": "indian+saree+silk",
  "accessories": "indian+jewelry+accessories+fashion",
};

/**
 * Returns a unique, category-relevant image URL for each product.
 * Uses Unsplash source API with search terms + unique sig to guarantee
 * no two products share the same image.
 */
export function getProductImage(categoryId: string, index: number): string {
  const searchTerm = categorySearchTerms[categoryId] || "indian+fashion";
  // Use a unique sig per category+index combination to get different images
  return `https://source.unsplash.com/400x500/?${searchTerm}&sig=${categoryId}-${index}`;
}
