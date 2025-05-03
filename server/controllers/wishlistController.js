const Wishlist = require('../models/Wishlist');

exports.createWishlist = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const wishlist = await Wishlist.create({ name, createdBy: userId });
    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserWishlists = async (req, res) => {
  try {
    const { userId } = req.query;
    const wishlists = await Wishlist.find({ createdBy: userId });
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const { name } = req.body;
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Wishlist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
