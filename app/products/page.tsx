'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/loadProducts';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load products from API
    fetch('/api/products')
      .then((res) => res.json())
      .then((products: Product[]) => {
        setAllProducts(products);
        setFilteredProducts(products);
        setIsLoading(false);

        // Apply category filter from URL
        const category = searchParams.get('category');
        if (category) {
          const filtered = products.filter(
            (p) =>
              p.category.lvl1 === category ||
              p.category.lvl2 === category ||
              p.category.lvl3 === category
          );
          setFilteredProducts(filtered);
        }
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-aroma-green text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Boutique</h1>
          <p className="text-gray-600 mb-4">
            Découvrez notre sélection complète de produits naturels
          </p>
          {searchParams.get('category') && (
            <div className="inline-block bg-aroma-green-light text-aroma-green px-4 py-2 rounded-aroma text-sm font-medium">
              Filtre actif : {searchParams.get('category')}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters products={allProducts} onFilterChange={setFilteredProducts} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

