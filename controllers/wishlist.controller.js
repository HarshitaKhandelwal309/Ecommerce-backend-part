const wishListModel = require('../models/wishlist.model');
const productModel = require('../models/product.model')

exports.addWishListProduct = async(req, res) => {
        const userId = req.user._id
        const user = req.user;
        if(user.role !=='USER')
        {
            return res.json({
                error:"Access Denied",
                data:null,
                code :401
            })
        }
        const productId = req.body.product_id
        try {

            const addWishlist = new wishListModel({
                product_id: productId,
                user: userId,

            })
            const addedWishlist = await addWishlist.save()
            res.json({
                data: addedWishlist,
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
    // remove from wishlist 
exports.removeWishListProduct = async(req, res) => {
        // const userId = req.user._id;
        const user = req.user;
        if(user.role !=='USER')
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
            await wishListModel.findByIdAndDelete(_id);


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
    //fetch wishlist 
exports.fetchWishListProduct = async(req, res) => {
   const usersId = req.user._id;
    const user = req.user;
    if(user.role!=='USER')
    {
        return res.json({
            error:"Access Denied",
            data:null,
            code :401
        })
    }
    // console.log(userId)
    try {
        // const user = req.user._id
        const fetchWishlist = await wishListModel.find({_user:usersId }).populate("product_id")
            
        
           
            res.json({
                data: fetchWishlist,
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