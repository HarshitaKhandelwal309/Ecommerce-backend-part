const express = require('express');
const router = express.Router();
const { addProductController, updateProductController, deleteProductController, fetchProductController,fetchProductForHome,fetchProductForHomeById } = require('../controllers/product.controller');
// import auth middleware
const auth = require('../middlewares/auth')
    //all routes
    //add product
router.post('/api/add/product', auth, addProductController)

//update product
router.patch('/api/update/product', auth, updateProductController)
    //deleteproduct
router.delete('/api/delete/product', auth, deleteProductController)
    //fetch product
router.get('/api/get/product', auth, fetchProductController)

//fetch product by category for home page

router.get('/api/get/product/home/:categories',fetchProductForHome )
//fetch product by id for home page

router.get('/api/get/product/home/byid/:id',fetchProductForHomeById )

//export router
module.exports = router;