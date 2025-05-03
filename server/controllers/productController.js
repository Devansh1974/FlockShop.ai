const Wishlist = require('../models/Wishlist');

exports.addProduct = async (req, res) => {
  const { wishlistId } = req.params;
  const { name, imageUrl, price, addedBy } = req.body;
  try {
    const wishlist = await Wishlist.findById(wishlistId);
    wishlist.products.push({ name, imageUrl, price, addedBy });
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { wishlistId, productId } = req.params;
  const { name, imageUrl, price } = req.body;
  try {
    const wishlist = await Wishlist.findById(wishlistId);
    const product = wishlist.products.id(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.set({ name, imageUrl, price });
    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { wishlistId, productId } = req.params;
  try {
    const wishlist = await Wishlist.findById(wishlistId);
    wishlist.products.id(productId).remove();
    await wishlist.save();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
