const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const wishListSchema = new Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productModel'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }
})

const wishListModel = model("wishListModel", wishListSchema);
module.exports = wishListModel;