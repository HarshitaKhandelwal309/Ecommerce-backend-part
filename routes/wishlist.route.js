const express = require('express');
const router = express.Router();
const { addWishListProduct, fetchWishListProduct, removeWishListProduct } = require('../controllers/wishlist.controller')
const auth = require('../middlewares/auth');

// add to wishlist
router.post('/api/addWishlist/product', auth, addWishListProduct)


// fetch wishlist
router.get('/api/fetchWishlist/product', auth, fetchWishListProduct)


// remove wishlist
router.delete('/api/removeWishlist/product', auth, removeWishListProduct)

//exportrouter
module.exports = router