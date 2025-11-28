import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-aroma-beige">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-aroma-green mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link
          href="/"
          className="bg-aroma-green text-white px-6 py-3 rounded-aroma font-medium hover:bg-aroma-green-dark transition-colors inline-block"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

