const orderModel = require('../models/order.model')

exports.placeOrderController = async(req, res) => {
    const _user = req.user._id

    if(req.user.role !=='USER')
    {
        return res.json({
            error:"Access Denied",
            data:null,
            code :401
        })
    }
    try {
        const placeOrder = new orderModel({
            product_id: req.body.product_id,
            orderDate: req.body.orderDate,
            orderNumber: req.body.orderNumber,
            address: req.body.address,
            user: _user

        })
        const order = await placeOrder.save();
        res.json({
            data: order,
            error: null,
            code: 200

        })


    } catch (error) {
        res.json({
            error: "something went wrong",
            data: null,
            code: 500
        })
    }
}
exports.fetchOrderController = async(req, res) => {
    const _user = req.user._id
    if(req.user.role !=='USER')
    {
        return res.json({
            error:"Access Denied",
            data:null,
            code :401
        })
    }
        // console.log(_user._id);
    try {
        const fetchedOrder = await orderModel.find({ user: _user }).populate("product_id");
        res.json({
            data: fetchedOrder,
            error: null,
            code: 200
        })


    } catch (error) {
        res.json({
            error: "something went wrong",
            data: null,
            code: 500
        })
    }

}
exports.deleteOrderController = async(req, res) => {
    // const userId = req.user._id;
    const user = req.user;
    if(req.user.role !=='USER')
    {
        return res.json({
            error:"Access Denied",
            data:null,
            code :401
        })
    }
    // const productId = req.body.product
    try {
        const _id = req.query._id;
        await orderModel.findByIdAndDelete(_id);


        res.json({
            data: "delete successfully",
            error: null,
            success: 200
        })
    } catch (error) {
        res.json({
            error: "something went wrong",
            data: null,
            code: 500
        })
    }
}