const express = require('express');
const router = express.Router();
const {
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.post('/:wishlistId/products', addProduct);
router.put('/:wishlistId/products/:productId', updateProduct);
router.delete('/:wishlistId/products/:productId', deleteProduct);

module.exports = router;
