import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/ai/productSearch';
import { getRecommendations, generateRecommendationMessage } from '@/lib/ai/recommendationAgent';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message requis' },
        { status: 400 }
      );
    }

    const lowerMessage = message.toLowerCase().trim();

    // Détecter l'intention
    const searchKeywords = ['recherche', 'cherche', 'trouve', 'où', 'trouver', 'rechercher', 'produit'];
    const recommendationKeywords = ['besoin', 'recommand', 'conseil', 'peau', 'cheveux', 'acné', 'sèche', 'gras', 'stress', 'fatigue', 'hydrat', 'anti-âge', 'aide', 'problème', 'pour'];

    const isSearchQuery = searchKeywords.some(keyword => lowerMessage.includes(keyword)) && lowerMessage.length < 50;
    const isRecommendationQuery = recommendationKeywords.some(keyword => lowerMessage.includes(keyword));

    let answer = '';
    let products: any[] = [];

    if (isSearchQuery) {
      // Recherche de produits
      const searchResults = searchProducts(message, 5);
      products = searchResults.map((r) => r.product);

      if (products.length > 0) {
        answer = `J'ai trouvé ${products.length} produit(s) correspondant à votre recherche :\n\n`;
        products.forEach((p, index) => {
          answer += `${index + 1}. **${p.name}** - ${p.shortDescription}\n`;
        });
        answer += `\nCliquez sur un produit pour voir plus de détails !`;
      } else {
        answer = `Je n'ai pas trouvé de produits correspondant à "${message}". Pouvez-vous reformuler votre recherche ?`;
      }
    } else if (isRecommendationQuery) {
      // Recommandations basées sur les besoins
      const recommendations = getRecommendations(message, 5);
      products = recommendations.map((r) => r.product);
      answer = generateRecommendationMessage(message, recommendations);
    } else {
      // Par défaut, essayer les deux approches
      const searchResults = searchProducts(message, 5);
      const recommendations = getRecommendations(message, 5);

      // Prioriser les recommandations si elles existent
      if (recommendations.length > 0) {
        products = recommendations.map((r) => r.product);
        answer = generateRecommendationMessage(message, recommendations);
      } else if (searchResults.length > 0) {
        products = searchResults.map((r) => r.product);
        answer = `Voici des produits qui pourraient vous intéresser :\n\n`;
        products.forEach((p, index) => {
          answer += `${index + 1}. **${p.name}** - ${p.shortDescription}\n`;
        });
        answer += `\nCliquez sur un produit pour voir plus de détails !`;
      } else {
        answer = `Je comprends votre demande. Pouvez-vous être plus précis ? Par exemple :\n\n- "Je cherche un produit pour peau sèche"\n- "Recommandez-moi un shampooing pour cheveux gras"\n- "J'ai besoin d'aide pour l'acné"\n- "Produit hydratant"\n- "Vitamine C"`;
      }
    }

    return NextResponse.json({
      answer,
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        shortDescription: p.shortDescription,
        price: p.price,
        category: p.category,
        slug: p.slug,
      })),
    });
  } catch (error) {
    console.error('Error in assistant API:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre demande' },
      { status: 500 }
    );
  }
}

