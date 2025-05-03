const express = require('express');
const router = express.Router();
const {
  createWishlist,
  getUserWishlists,
  updateWishlist,
  deleteWishlist,
} = require('../controllers/wishlistController');

router.post('/', createWishlist);
router.get('/', getUserWishlists);
router.put('/:id', updateWishlist);
router.delete('/:id', deleteWishlist);

module.exports = router;
