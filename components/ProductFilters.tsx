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
  
  // Get search from URL (source of truth)
  const searchFromUrl = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState<string>(searchFromUrl);

  // Get category from URL (source of truth)
  const selectedCategory = searchParams.get('category') || '';

  // Sync searchTerm with URL when URL changes
  useEffect(() => {
    setSearchTerm(searchFromUrl);
  }, [searchFromUrl]);

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

    // Search filter (use URL param or local searchTerm)
    const activeSearch = searchFromUrl || searchTerm;
    if (activeSearch) {
      const term = activeSearch.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term) ||
          p.longDescription.toLowerCase().includes(term) ||
          p.category.lvl1.toLowerCase().includes(term) ||
          p.category.lvl2.toLowerCase().includes(term) ||
          p.category.lvl3.toLowerCase().includes(term)
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
  }, [searchTerm, searchFromUrl, selectedCategory, selectedQuality, products, onFilterChange]);

  return (
    <div className="bg-white rounded-2xl border border-aroma-beige shadow-md p-6 space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-aroma-beige">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-aroma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtres
        </h3>
      </div>

      {/* Search */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
          <svg className="w-4 h-4 text-aroma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Recherche
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full px-4 py-3 bg-white border-2 border-aroma-green-light rounded-xl focus:outline-none focus:ring-2 focus:ring-aroma-green focus:border-aroma-green transition-all text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Separator */}
      <div className="border-t border-aroma-beige"></div>

      {/* Category */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
          <svg className="w-4 h-4 text-aroma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Catégorie
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border-2 border-aroma-green-light rounded-xl focus:outline-none focus:ring-2 focus:ring-aroma-green focus:border-aroma-green transition-all text-gray-700 appearance-none cursor-pointer"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Separator */}
      <div className="border-t border-aroma-beige"></div>

      {/* Quality */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
          <svg className="w-4 h-4 text-aroma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Type / Qualité
        </label>
        <select
          value={selectedQuality}
          onChange={(e) => setSelectedQuality(e.target.value)}
          className="w-full px-4 py-3 bg-white border-2 border-aroma-green-light rounded-xl focus:outline-none focus:ring-2 focus:ring-aroma-green focus:border-aroma-green transition-all text-gray-700 appearance-none cursor-pointer"
        >
          <option value="">Tous les types</option>
          {qualities.map((qual) => (
            <option key={qual} value={qual}>
              {qual}
            </option>
          ))}
        </select>
      </div>

      {/* Separator */}
      <div className="border-t border-aroma-beige pt-2"></div>

      {/* Reset */}
      <button
        onClick={() => {
          handleCategoryChange('');
          setSelectedQuality('');
          setSearchTerm('');
        }}
        className="w-full bg-aroma-green-light text-aroma-green px-6 py-3 rounded-xl font-semibold hover:bg-aroma-green hover:text-white transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Réinitialiser
      </button>
    </div>
  );
}

