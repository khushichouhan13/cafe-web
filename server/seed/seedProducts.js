require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: 'Midnight Roast',
    description: 'Bold, velvety espresso with notes of dark chocolate and smoky undertones.',
    price: 420,
    category: 'coffee',
    imageUrl: '/images/midnight_roast.png',
    badge: 'Popular'
  },
  {
    name: 'Oat Milk Latte',
    description: 'Silky smooth latte crafted with house-made oat milk and single-origin espresso.',
    price: 460,
    category: 'oatmilk',
    imageUrl: '/images/oat_milk_latte.png',
    badge: 'New'
  },
  {
    name: 'Hibiscus Iced Tea',
    description: 'Refreshing floral iced tea with hibiscus, mint, and a hint of citrus.',
    price: 380,
    category: 'snacks',
    imageUrl: '/images/hibiscus_iced_tea.png',
    badge: 'Seasonal'
  },
  {
    name: 'Almond Croissant',
    description: 'Twice-baked butter croissant filled with almond cream and toasted flakes.',
    price: 340,
    category: 'snacks',
    imageUrl: '/images/almond_croissant.png',
    badge: ''
  },
  {
    name: 'Cold Brew Float',
    description: 'Signature cold brew topped with a scoop of vanilla bean ice cream.',
    price: 549,
    category: 'coffee',
    imageUrl: '/images/cold_brew_float.png',
    badge: 'Chef\'s Pick'
  },
  {
    name: 'Avocado Tartine',
    description: 'Sourdough toast with whipped avocado, microgreens, and everything seasoning.',
    price: 680,
    category: 'snacks',
    imageUrl: '/images/avocado_tartine.png',
    badge: ''
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('🌱 Database seeded with 6 products!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
