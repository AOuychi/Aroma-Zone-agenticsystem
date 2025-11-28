import { notFound } from 'next/navigation';
import { getProductById, loadProducts } from '@/lib/loadProducts';
import ProductDetails from '@/components/ProductDetails';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  // Get related products (same category)
  const allProducts = loadProducts();
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category.lvl1 === product.category.lvl1 ||
          p.category.lvl2 === product.category.lvl2)
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <ProductDetails product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-aroma-beige py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

