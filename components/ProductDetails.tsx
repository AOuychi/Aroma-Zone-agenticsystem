import Link from 'next/link';
import { Product } from '@/lib/loadProducts';
import { formatPrice } from '@/utils/format';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-aroma-green-light rounded-aroma h-96 flex items-center justify-center">
          <span className="text-aroma-green text-8xl font-bold">
            {product.name.charAt(0)}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            {/* Breadcrumb Category */}
            <nav className="text-sm text-gray-500 mb-4">
              <span className="hover:text-aroma-green cursor-pointer">{product.category.lvl1}</span>
              {' > '}
              <span className="hover:text-aroma-green cursor-pointer">{product.category.lvl2}</span>
              {product.category.lvl3 && (
                <>
                  {' > '}
                  <span className="hover:text-aroma-green cursor-pointer">{product.category.lvl3}</span>
                </>
              )}
            </nav>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{product.shortDescription}</p>
          </div>

          {/* Price & Stock */}
          <div className="flex items-center justify-between py-4 border-t border-b border-aroma-beige">
            <div>
              <span className="text-3xl font-bold text-aroma-green">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.availableQuantity > 0 ? (
              <span className="text-green-600 bg-green-50 px-4 py-2 rounded-full font-medium">
                ✓ En stock ({product.availableQuantity} disponibles)
              </span>
            ) : (
              <span className="text-red-600 bg-red-50 px-4 py-2 rounded-full font-medium">
                Rupture de stock
              </span>
            )}
          </div>

          {/* Quality Tags */}
          <div className="flex flex-wrap gap-2">
            {product.quality.lvl1 && (
              <span className="bg-aroma-green-light text-aroma-green px-3 py-1 rounded-full text-sm">
                {product.quality.lvl1}
              </span>
            )}
            {product.quality.lvl2 && (
              <span className="bg-aroma-green-light text-aroma-green px-3 py-1 rounded-full text-sm">
                {product.quality.lvl2}
              </span>
            )}
            {product.quality.lvl3 && (
              <span className="bg-aroma-green-light text-aroma-green px-3 py-1 rounded-full text-sm">
                {product.quality.lvl3}
              </span>
            )}
          </div>

          {/* Category Info */}
          <div className="bg-aroma-beige rounded-aroma p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Catégorie</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div><span className="font-medium">Niveau 1:</span> {product.category.lvl1}</div>
              <div><span className="font-medium">Niveau 2:</span> {product.category.lvl2}</div>
              {product.category.lvl3 && (
                <div><span className="font-medium">Niveau 3:</span> {product.category.lvl3}</div>
              )}
            </div>
          </div>

          {/* Long Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Description détaillée</h2>
            <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
          </div>
          
          {/* Product Info */}
          <div className="bg-aroma-green-light rounded-aroma p-4">
            <h3 className="text-sm font-semibold text-aroma-green mb-3">Informations produit</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Prix:</span>
                <span className="ml-2 text-aroma-green font-bold">{formatPrice(product.price)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Stock:</span>
                <span className={`ml-2 font-medium ${product.availableQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.availableQuantity} unité{product.availableQuantity > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex space-x-4 pt-6">
            <Link
              href={`/assistant?product=${product.id}`}
              className="flex-1 bg-aroma-green text-white px-6 py-3 rounded-aroma font-medium hover:bg-aroma-green-dark transition-colors text-center"
            >
              Voir recommandations IA
            </Link>
            <button
              disabled={product.availableQuantity === 0}
              className="flex-1 bg-aroma-green-light text-aroma-green px-6 py-3 rounded-aroma font-medium hover:bg-aroma-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

