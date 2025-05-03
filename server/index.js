const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const wishlistRoutes = require('./routes/wishlist');

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/wishlists', wishlistRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
  .catch(err => console.log(err));
