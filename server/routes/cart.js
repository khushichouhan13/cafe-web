const express = require('express');
const router = express.Router();
const { processCart } = require('../controllers/cartController');

router.post('/', processCart);

module.exports = router;
