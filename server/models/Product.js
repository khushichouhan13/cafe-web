const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['coffee', 'oatmilk', 'snacks'],
    required: true
  },
  imageUrl: { type: String, required: true },
  badge: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
