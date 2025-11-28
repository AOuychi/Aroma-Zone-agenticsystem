import fs from 'fs';
import path from 'path';

export interface Product {
  id: string;
  slug: string;
  category: {
    lvl1: string;
    lvl2: string;
    lvl3: string;
  };
  name: string;
  shortDescription: string;
  longDescription: string;
  quality: {
    lvl1: string;
    lvl2: string;
    lvl3: string;
  };
  price: number;
  availableQuantity: number;
}

let productsCache: Product[] | null = null;

export function loadProducts(): Product[] {
  if (productsCache) {
    return productsCache;
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    productsCache = JSON.parse(fileContents) as Product[];
    return productsCache;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export function getProductById(id: string): Product | undefined {
  const products = loadProducts();
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = loadProducts();
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  const products = loadProducts();
  return products.filter(
    (p) =>
      p.category.lvl1.toLowerCase() === category.toLowerCase() ||
      p.category.lvl2.toLowerCase() === category.toLowerCase() ||
      p.category.lvl3.toLowerCase() === category.toLowerCase()
  );
}

