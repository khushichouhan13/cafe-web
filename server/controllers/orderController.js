const Order = require('../models/Order');

// POST /api/order
const placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order items are required' });
    }
    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ success: false, message: 'Valid total is required' });
    }
    const order = new Order({ items, total, status: 'confirmed' });
    const savedOrder = await order.save();
    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Your coffee is being prepared.',
      data: savedOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { placeOrder };
