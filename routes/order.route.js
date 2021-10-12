const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const { placeOrderController, fetchOrderController,deleteOrderController } = require('../controllers/oder.controller')

//route for adding  order
router.post('/api/place/order', auth, placeOrderController);

//  route for fetching order
router.get('/api/fetch/order', auth, fetchOrderController);
//  route for delete order
router.delete('/api/delete/order', auth,deleteOrderController);


//exports router
module.exports = router;