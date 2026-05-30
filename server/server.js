require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins: local dev + deployed Vercel frontend
const allowedOrigins = [
  'http://localhost:5173',
  /\.vercel\.app$/,        // any *.vercel.app subdomain
  /\.onrender\.com$/,      // any *.onrender.com subdomain
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser requests (Postman etc)
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    callback(allowed ? null : new Error('CORS not allowed'), allowed);
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// Health check
app.get('/', (req, res) =>
  res.json({ message: 'Brew Haven Café API is running ☕' })
);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const Product = require('./models/Product');

// Auto-seed function to ensure products exist in the database
const autoSeedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('🌱 No products found in database. Auto-seeding default products...');
      const defaultProducts = [
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
          badge: "Chef's Pick"
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
      await Product.insertMany(defaultProducts);
      console.log('✅ Auto-seeding completed successfully!');
    }
  } catch (err) {
    console.error('⚠️ Auto-seeding failed:', err.message);
  }
};

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    await autoSeedProducts();
  }
};

// Start the server or configure Vercel Serverless environment
if (process.env.VERCEL || process.env.NOW_REGION) {
  // For Vercel serverless: connect lazily on each request
  app.use(async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (err) {
      res.status(500).json({ success: false, message: 'Database connection failed' });
    }
  });
} else {
  // For standard environments (Render, local dev, Docker etc.): start the server
  connectDB()
    .then(() => app.listen(PORT, () =>
      console.log(`☕ Server running on http://localhost:${PORT}`)
    ))
    .catch(err => {
      console.error('❌ MongoDB connection failed:', err.message);
      process.exit(1);
    });
}

// Export for Vercel serverless
module.exports = app;
