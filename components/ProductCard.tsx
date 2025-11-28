import Link from 'next/link';
import { Product } from '@/lib/loadProducts';
import { formatPrice } from '@/utils/format';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-2xl border border-aroma-beige shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
        {/* Image Placeholder - Square */}
        <div className="w-full aspect-square bg-aroma-green-light flex items-center justify-center group-hover:bg-aroma-green transition-colors">
          <span className="text-aroma-green group-hover:text-white text-5xl font-bold transition-colors">
            {product.name.charAt(0)}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow space-y-3">
          {/* Category */}
          <div className="text-xs text-aroma-green font-medium uppercase tracking-wide">
            {product.category.lvl1} • {product.category.lvl2}
          </div>
          
          {/* Title - More Visible */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-aroma-green transition-colors leading-tight">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-grow">
            {product.shortDescription}
          </p>
          
          {/* Quality Tags - Harmonized */}
          {product.quality.lvl1 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium bg-aroma-green-light text-aroma-green px-3 py-1.5 rounded-full">
                {product.quality.lvl1}
              </span>
              {product.quality.lvl2 && (
                <span className="text-xs font-medium bg-aroma-beige text-gray-700 px-3 py-1.5 rounded-full">
                  {product.quality.lvl2}
                </span>
              )}
            </div>
          )}
          
          {/* Price and Stock */}
          <div className="flex items-center justify-between pt-2 border-t border-aroma-beige">
            <span className="text-xl font-bold text-aroma-green">
              {formatPrice(product.price)}
            </span>
            {product.availableQuantity > 0 ? (
              <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                En stock
              </span>
            ) : (
              <span className="text-xs font-medium text-red-700 bg-red-50 px-3 py-1.5 rounded-full">
                Rupture
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

