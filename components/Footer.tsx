import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-aroma-beige border-t border-aroma-green-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-aroma-green font-semibold text-lg mb-4">À propos</h3>
            <p className="text-gray-600 text-sm">
              Votre destination pour des produits naturels et bio de qualité.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-aroma-green font-semibold text-lg mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-aroma-green transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="text-gray-600 hover:text-aroma-green transition-colors">
                  Assistant IA
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-aroma-green font-semibold text-lg mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=Beauté" className="text-gray-600 hover:text-aroma-green transition-colors">
                  Beauté
                </Link>
              </li>
              <li>
                <Link href="/products?category=Nutrition" className="text-gray-600 hover:text-aroma-green transition-colors">
                  Nutrition
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-aroma-green font-semibold text-lg mb-4">Contact</h3>
            <p className="text-gray-600 text-sm">
              support@aroma-zone-like.com
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-aroma-green-light text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Aroma-Zone Like. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

