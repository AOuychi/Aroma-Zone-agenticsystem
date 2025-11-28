import Link from 'next/link';
import { loadProducts } from '@/lib/loadProducts';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  const allProducts = loadProducts();
  const popularProducts = allProducts.slice(0, 8);

  const categories = [
    {
      name: 'Beauté',
      description: 'Soins visage, corps et cheveux',
      href: '/products?category=Beauté',
      color: 'bg-aroma-green-light',
    },
    {
      name: 'Nutrition',
      description: 'Compléments et superfoods',
      href: '/products?category=Nutrition',
      color: 'bg-aroma-beige',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-aroma-green-light to-aroma-beige py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-aroma-green mb-6">
            Bienvenue chez Aroma-Zone
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Découvrez notre sélection de produits naturels et bio pour votre beauté, 
            votre nutrition et votre bien-être.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-aroma-green text-white px-8 py-3 rounded-aroma font-medium hover:bg-aroma-green-dark transition-colors"
            >
              Découvrir la boutique
            </Link>
            <Link
              href="/assistant"
              className="bg-white text-aroma-green px-8 py-3 rounded-aroma font-medium hover:bg-aroma-green-light transition-colors border-2 border-aroma-green"
            >
              Parler à l'assistant IA
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Explorez nos catégories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`${category.color} rounded-aroma p-8 hover:shadow-lg transition-all duration-300`}
              >
                <h3 className="text-2xl font-bold text-aroma-green mb-3">
                  {category.name}
                </h3>
                <p className="text-gray-700">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-aroma-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Produits populaires
            </h2>
            <Link
              href="/products"
              className="text-aroma-green hover:text-aroma-green-dark font-medium"
            >
              Voir tout →
            </Link>
          </div>
          <ProductGrid products={popularProducts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-aroma-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin de conseils personnalisés ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Notre assistant IA est là pour vous aider à trouver les produits 
            parfaitement adaptés à vos besoins.
          </p>
          <Link
            href="/assistant"
            className="bg-white text-aroma-green px-8 py-3 rounded-aroma font-medium hover:bg-aroma-green-light transition-colors inline-block"
          >
            Essayer l'assistant IA
          </Link>
        </div>
      </section>
    </div>
  );
}

