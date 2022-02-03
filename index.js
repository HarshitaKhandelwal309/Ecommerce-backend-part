//create server
const express = require('express')
var cors = require('cors')
const app = express();
app.use(cors()) 
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb" , extended:true}))
const user_router = require('./routes/user.routes');
const product_router = require('./routes/product.routes')
const order_routes = require('./routes/order.route')
const wishlist_routes = require('./routes/wishlist.route')

//require mongodb file
const mongodbFile = require('./mongoDB.setup');
//import router from user.routes.js

app.use(express.json());



app.use([user_router, product_router, order_routes, wishlist_routes])



//listening to port
const port = Process.env.PORT || 4000;
app.listen(port, function() {
    console.log(`server is up on port ${port}`);
})