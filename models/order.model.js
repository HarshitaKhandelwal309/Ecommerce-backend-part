const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productModel'
    },
    orderDate: {
        type: String
    },
    orderNumber: {
        type: String
    },
    address: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }
})

const orderModel = model("orderModel", orderSchema);
module.exports = orderModel;