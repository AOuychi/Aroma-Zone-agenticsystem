import { Product } from '@/lib/loadProducts';
import { loadProducts } from '@/lib/loadProducts';

interface SearchResult {
  product: Product;
  score: number;
}

export function searchProducts(query: string, limit: number = 10): SearchResult[] {
  const products = loadProducts();
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) {
    return products.slice(0, limit).map((p) => ({ product: p, score: 1 }));
  }

  const results: SearchResult[] = [];

  for (const product of products) {
    let score = 0;

    // Exact name match (highest score)
    if (product.name.toLowerCase() === lowerQuery) {
      score += 100;
    } else if (product.name.toLowerCase().includes(lowerQuery)) {
      score += 50;
    }

    // Category match
    if (
      product.category.lvl1.toLowerCase().includes(lowerQuery) ||
      product.category.lvl2.toLowerCase().includes(lowerQuery) ||
      product.category.lvl3.toLowerCase().includes(lowerQuery)
    ) {
      score += 30;
    }

    // Description match
    const searchTerms = lowerQuery.split(' ');
    for (const term of searchTerms) {
      if (product.shortDescription.toLowerCase().includes(term)) {
        score += 10;
      }
      if (product.longDescription.toLowerCase().includes(term)) {
        score += 5;
      }
    }

    // Quality match
    if (
      product.quality.lvl1.toLowerCase().includes(lowerQuery) ||
      product.quality.lvl2.toLowerCase().includes(lowerQuery) ||
      product.quality.lvl3.toLowerCase().includes(lowerQuery)
    ) {
      score += 20;
    }

    if (score > 0) {
      results.push({ product, score });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

export function searchByCategory(category: string): Product[] {
  const products = loadProducts();
  const lowerCategory = category.toLowerCase();

  return products.filter(
    (p) =>
      p.category.lvl1.toLowerCase().includes(lowerCategory) ||
      p.category.lvl2.toLowerCase().includes(lowerCategory) ||
      p.category.lvl3.toLowerCase().includes(lowerCategory)
  );
}

