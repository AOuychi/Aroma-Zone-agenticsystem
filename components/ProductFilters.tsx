'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/lib/loadProducts';

interface ProductFiltersProps {
  products: Product[];
  onFilterChange: (filtered: Product[]) => void;
}

export default function ProductFilters({ products, onFilterChange }: ProductFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedQuality, setSelectedQuality] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get category from URL (source of truth)
  const selectedCategory = searchParams.get('category') || '';

  // Extract unique categories and qualities
  const categories = Array.from(
    new Set(products.flatMap((p) => [p.category.lvl1, p.category.lvl2, p.category.lvl3]))
  ).filter(Boolean);

  const qualities = Array.from(
    new Set(products.flatMap((p) => [p.quality.lvl1, p.quality.lvl2, p.quality.lvl3]))
  ).filter(Boolean);

  // Handle category change and update URL
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term) ||
          p.longDescription.toLowerCase().includes(term)
      );
    }

    // Category filter (from URL)
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) =>
          p.category.lvl1 === selectedCategory ||
          p.category.lvl2 === selectedCategory ||
          p.category.lvl3 === selectedCategory
      );
    }

    // Quality filter
    if (selectedQuality) {
      filtered = filtered.filter(
        (p) =>
          p.quality.lvl1 === selectedQuality ||
          p.quality.lvl2 === selectedQuality ||
          p.quality.lvl3 === selectedQuality
      );
    }

    onFilterChange(filtered);
  }, [searchTerm, selectedCategory, selectedQuality, products, onFilterChange]);

  return (
    <div className="bg-aroma-beige rounded-aroma p-6 space-y-6">
      <h3 className="text-lg font-semibold text-aroma-green">Filtres</h3>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recherche
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full px-4 py-2 border border-aroma-green-light rounded-lg focus:outline-none focus:ring-2 focus:ring-aroma-green"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Catégorie
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-aroma-green-light rounded-lg focus:outline-none focus:ring-2 focus:ring-aroma-green"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Quality */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type / Qualité
        </label>
        <select
          value={selectedQuality}
          onChange={(e) => setSelectedQuality(e.target.value)}
          className="w-full px-4 py-2 border border-aroma-green-light rounded-lg focus:outline-none focus:ring-2 focus:ring-aroma-green"
        >
          <option value="">Tous les types</option>
          {qualities.map((qual) => (
            <option key={qual} value={qual}>
              {qual}
            </option>
          ))}
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          handleCategoryChange('');
          setSelectedQuality('');
          setSearchTerm('');
        }}
        className="w-full bg-aroma-green-light text-aroma-green px-4 py-2 rounded-lg hover:bg-aroma-green hover:text-white transition-colors"
      >
        Réinitialiser
      </button>
    </div>
  );
}

