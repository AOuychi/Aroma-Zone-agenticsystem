import { Product } from '@/lib/loadProducts';
import { loadProducts } from '@/lib/loadProducts';

interface RecommendationResult {
  product: Product;
  relevanceScore: number;
  reason: string;
}

// Mapping des besoins utilisateur vers des mots-clés produits
const needKeywords: Record<string, string[]> = {
  'peau sèche': ['hydratation', 'hydratant', 'nourrissant', 'apaisant', 'karité', 'argan', 'coco'],
  'peau grasse': ['matifiant', 'régulateur', 'purifiant', 'séborégulateur', 'thé vert', 'charbon'],
  'peau mixte': ['équilibrant', 'matifiant', 'régulateur', 'léger'],
  'acné': ['purifiant', 'anti-imperfections', 'détoxifiant', 'charbon', 'tea tree', 'niacinamide'],
  'rides': ['anti-âge', 'fermeté', 'collagène', 'peptides', 'grenade'],
  'taches': ['éclat', 'vitamine c', 'antitache', 'illuminant'],
  'cheveux secs': ['nourrissant', 'karité', 'coco', 'argan', 'ricin', 'avocat'],
  'cheveux gras': ['régulateur', 'jojoba', 'purifiant', 'équilibrant'],
  'cheveux fins': ['volume', 'fortifiant', 'bambou'],
  'pellicules': ['anti-pelliculaire', 'purifiant', 'tea tree', 'assainissant'],
  'stress': ['apaisant', 'relaxant', 'anti-stress', 'magnesium'],
  'fatigue': ['énergie', 'vitamines', 'magnesium', 'fer'],
  'immunité': ['vitamine c', 'vitamine d', 'zinc', 'immunité'],
  'digestion': ['digestif', 'probiotiques', 'enzymes', 'charbon'],
  'sport': ['protéines', 'récupération', 'énergie', 'bcaa', 'électrolytes'],
  'hydratation': ['hydratant', 'aloe', 'hyaluronique'],
};

export function getRecommendations(userNeed: string, limit: number = 10): RecommendationResult[] {
  const products = loadProducts();
  const lowerNeed = userNeed.toLowerCase();
  const results: RecommendationResult[] = [];

  // Trouver les mots-clés correspondants
  let relevantKeywords: string[] = [];
  for (const [need, keywords] of Object.entries(needKeywords)) {
    if (lowerNeed.includes(need)) {
      relevantKeywords = [...relevantKeywords, ...keywords];
    }
  }

  // Si aucun mapping trouvé, utiliser le besoin directement comme mot-clé
  if (relevantKeywords.length === 0) {
    relevantKeywords = [lowerNeed];
  }

  for (const product of products) {
    let relevanceScore = 0;
    const matchedKeywords: string[] = [];

    const searchText = `
      ${product.name} 
      ${product.shortDescription} 
      ${product.longDescription}
      ${product.quality.lvl1} ${product.quality.lvl2} ${product.quality.lvl3}
      ${product.category.lvl1} ${product.category.lvl2} ${product.category.lvl3}
    `.toLowerCase();

    // Vérifier chaque mot-clé
    for (const keyword of relevantKeywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        relevanceScore += 10;
        matchedKeywords.push(keyword);
      }
    }

    // Bonus pour correspondance exacte dans le nom
    if (product.name.toLowerCase().includes(lowerNeed)) {
      relevanceScore += 20;
    }

    // Bonus pour correspondance dans la description courte
    if (product.shortDescription.toLowerCase().includes(lowerNeed)) {
      relevanceScore += 15;
    }

    if (relevanceScore > 0) {
      const reason = matchedKeywords.length > 0
        ? `Correspond à : ${matchedKeywords.slice(0, 3).join(', ')}`
        : `Correspond à votre recherche : ${userNeed}`;

      results.push({
        product,
        relevanceScore,
        reason,
      });
    }
  }

  // Trier par score de pertinence
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return results.slice(0, limit);
}

export function generateRecommendationMessage(
  userNeed: string,
  recommendations: RecommendationResult[]
): string {
  if (recommendations.length === 0) {
    return `Je n'ai pas trouvé de produits correspondant à "${userNeed}". Pouvez-vous reformuler votre demande ? Par exemple : "peau sèche", "cheveux gras", "anti-âge", etc.`;
  }

  let message = `Voici mes recommandations pour "${userNeed}" :\n\n`;

  recommendations.forEach((rec, index) => {
    message += `${index + 1}. **${rec.product.name}** - ${rec.product.shortDescription}\n`;
    message += `   ${rec.reason}\n\n`;
  });

  message += `Ces produits sont spécialement adaptés à vos besoins. N'hésitez pas à cliquer sur un produit pour voir plus de détails !`;

  return message;
}

