'use client';

import Link from 'next/link';
import { useState } from 'react';

const categories = [
  {
    name: 'Beauté',
    subcategories: [
      { name: 'Soins visage', href: '/products?category=Soins visage' },
      { name: 'Soins corps', href: '/products?category=Soins corps' },
      { name: 'Soins cheveux', href: '/products?category=Soins cheveux' },
    ],
  },
  {
    name: 'Nutrition',
    subcategories: [
      { name: 'Complément alimentaires', href: '/products?category=Complément alimentaires' },
      { name: 'Cuisine', href: '/products?category=Cuisine' },
      { name: 'Sportif', href: '/products?category=Sportif' },
    ],
  },
];

export default function NavbarMegaMenu() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <nav className="bg-aroma-white border-b border-aroma-beige sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-aroma-green-light rounded-aroma flex items-center justify-center">
              <span className="text-aroma-green font-bold text-xl">AZ</span>
            </div>
            <span className="text-xl font-semibold text-aroma-green">Aroma-Zone</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-aroma-green transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-aroma-green transition-colors font-medium"
            >
              Boutique
            </Link>

            {/* Mega Menu Categories */}
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  href={`/products?category=${category.name}`}
                  className="text-gray-700 hover:text-aroma-green transition-colors font-medium block"
                >
                  {category.name}
                </Link>
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-aroma shadow-lg border border-aroma-beige p-4 z-50 transition-opacity duration-200 ${
                    hoveredCategory === category.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="space-y-2">
                    <Link
                      href={`/products?category=${category.name}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-aroma-green-light hover:text-aroma-green rounded-lg transition-colors font-semibold"
                    >
                      Voir tout {category.name}
                    </Link>
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-aroma-green-light hover:text-aroma-green rounded-lg transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/assistant"
              className="bg-aroma-green-light text-aroma-green px-4 py-2 rounded-aroma font-medium hover:bg-aroma-green hover:text-white transition-colors"
            >
              Assistant IA
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

