import { NextResponse } from 'next/server';
import { loadProducts } from '@/lib/loadProducts';

export async function GET() {
  try {
    const products = loadProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error loading products:', error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement des produits' },
      { status: 500 }
    );
  }
}

