import Link from 'next/link';
import { Product } from '@/lib/loadProducts';
import { formatPrice } from '@/utils/format';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-aroma border border-aroma-beige hover:shadow-lg transition-all duration-300 overflow-hidden group">
        {/* Image Placeholder */}
        <div className="w-full h-64 bg-aroma-green-light flex items-center justify-center group-hover:bg-aroma-green transition-colors">
          <span className="text-aroma-green group-hover:text-white text-4xl font-bold transition-colors">
            {product.name.charAt(0)}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-aroma-green mb-1 font-medium">
            {product.category.lvl1} • {product.category.lvl2}
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-aroma-green transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
          
          {/* Quality Tags */}
          {product.quality.lvl1 && (
            <div className="mb-3 flex flex-wrap gap-1">
              <span className="text-xs bg-aroma-green-light text-aroma-green px-2 py-0.5 rounded-full">
                {product.quality.lvl1}
              </span>
              {product.quality.lvl2 && (
                <span className="text-xs bg-aroma-beige text-gray-700 px-2 py-0.5 rounded-full">
                  {product.quality.lvl2}
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-aroma-green">
              {formatPrice(product.price)}
            </span>
            {product.availableQuantity > 0 ? (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                En stock ({product.availableQuantity})
              </span>
            ) : (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                Rupture
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

