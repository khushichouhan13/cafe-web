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

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
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
