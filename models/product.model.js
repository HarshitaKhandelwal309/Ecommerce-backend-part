const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const productSchema = new Schema({
    productName: {
        type: String,
        trim: true,
        require: true
    },
    price: {
        type: Number,
        trim: true,
        require: true
    },
    picture: {
        type: String,
        // require: true
    },
    description: {
        type: String,
        require: true
    },
    category:{
        type: String,
        // require: true
    },
    quantity:{
        type: Number,
        // require: true
    }

})

const productModel = model("productModel", productSchema);
//export productrmodel to product controller
module.exports = productModel;