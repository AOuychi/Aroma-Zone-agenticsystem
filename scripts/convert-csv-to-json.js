const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const csvPath = path.join(__dirname, '..', 'products.csv');
const jsonPath = path.join(__dirname, '..', 'data', 'products.json');

// Lire le CSV
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parser le CSV
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  bom: true,
  relax_quotes: true,
  trim: true,
});

// Convertir en JSON avec IDs uniques
const products = records.map((record, index) => {
  // Nettoyer les accents et créer un slug
  const slug = record.product_name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return {
    id: (index + 1).toString(),
    slug,
    category: {
      lvl1: record.product_category_lvl1 || '',
      lvl2: record.product_category_lvl2 || '',
      lvl3: record.product_category_lvl3 || '',
    },
    name: record.product_name || '',
    shortDescription: record.product_short_description || '',
    longDescription: record.product_long_description || '',
    quality: {
      lvl1: record.product_quality_lvl1 || '',
      lvl2: record.product_quality_lvl2 || '',
      lvl3: record.product_quality_lvl3 || '',
    },
    price: parseFloat(record.price) || 0,
    availableQuantity: parseInt(record.available_quantity) || 0,
  };
});

// Créer le dossier data s'il n'existe pas
const dataDir = path.dirname(jsonPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Sauvegarder en JSON
fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf-8');

console.log(`✅ Conversion réussie : ${products.length} produits convertis`);
console.log(`📁 Fichier sauvegardé : ${jsonPath}`);

