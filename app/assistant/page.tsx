'use client';

import { useSearchParams } from 'next/navigation';
import ChatUI from '@/components/ChatUI';

export default function AssistantPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');

  // Product context can be used in ChatUI if needed
  // For now, we'll let the API handle product-specific queries

  return (
    <div className="min-h-screen bg-aroma-beige py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Assistant IA
          </h1>
          <p className="text-gray-600">
            Posez vos questions et obtenez des recommandations personnalisées
          </p>
        </div>
        <ChatUI />
      </div>
    </div>
  );
}

