// POST /api/cart
const processCart = (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Items array required' });
    }
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({
      success: true,
      data: { items, total: parseFloat(total.toFixed(2)), itemCount: items.length }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { processCart };
