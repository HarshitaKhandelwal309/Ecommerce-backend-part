//import productModel from product.model.js
const productModel = require("../models/product.model")
    //import auth middleware
    const {cloudinary} =require("../cloudinery")


//all controllers

//add controller
exports.addProductController = async(req, res) => {
    const user = req.user
    try {
        if (user.role !== "ADMIN") {
            return res.json({
                error: "Access Denied",
                data: null,
                code: 401
            })
        }
        const uploadResponse = await cloudinary.uploader.upload(req.body.picture,
            {
                upload_preset:"test_media",
            })
            console.log("uploadResponse:", uploadResponse.secure_url)
        const product = new productModel({
            productName: req.body.productName,
            price: req.body.price,
            description: req.body.description,
            picture: uploadResponse.secure_url,
            category:req.body.category,
            quantity:req.body.quantity

        })
        await product.save()
        res.json({
            data: product,
            error: null,
            code: 200
        })
    } catch (error) {
        res.json({
            error: "Something went wrong",
            data: null,
            code: 500
        })
    }
}


//update controller
exports.updateProductController = async(req, res) => {
        const user = req.user
        console.log("user is" ,user)
        try {
            if (user.role !== "ADMIN") {
                return res.json({
                    error: "Access Denied",
                    data: null,
                    code: 401
                })
            }
            const u_id = req.query._id;
            const data = req.body;
            console.log( req.body);
            const docs = await productModel.updateOne({ _id: u_id }, { $set: req.body })
            //console.log(docs)
            res.json({
                data: docs,
                error: null,
                code: 200
            });


        } catch (error) {
            res.json({
                error: "Something went wrong",
                data: null,
                code: 500
            })
        }
    }
    //delete controller
exports.deleteProductController = async(req, res) => {
        const user = req.user;
        try {
            if (user.role !== "ADMIN") {
                return res.json({
                    error: "Access Denied",
                    data: null,
                    code: 401
                })
            }
            const _id = req.query._id;

            await productModel.findByIdAndDelete(_id)
            res.json({
                data: "Deleted Successfully",
                error: null,
                code: 200
            })
        } catch (error) {
            res.json({
                error: "Something went wrong",
                data: null,
                code: 500
            })
        }
    }
    //fetch controller
exports.fetchProductController = async(req, res) => {
    const user = req.user;
    try {
        if (user.role !== "ADMIN") {
            return res.json({
                error: "Access Denied",
                data: null,
                code: 401
            })
        } 
        const fetchedData = await productModel.find()
        console.log(fetchedData)
        res.json({
            data: fetchedData,
            error: null,
            code: 200
        }).status(200)

    } catch (error) {
        res.json({
            error: "Something went wrong",
            data: null,
            code: 500
        })
    }
}

///fetch product for home page by category
exports.fetchProductForHome=async(req,res)=>
{
    console.log(req.params.categories);
    let category =  req.params.categories
    try{
        const fetchedDataForHome= await productModel.find({"category":category})
        console.log(fetchedDataForHome)
        res.json({
            data: fetchedDataForHome,
            error: null,
            code: 200
        }).status(200)

    }
    catch (error) {
        res.json({
            error: "Something went wrong",
            data: null,
            code: 500
        })
    }
}
////fetch product by id for home page

exports.fetchProductForHomeById=async(req,res)=>
{
    console.log(req.params.id);
    let p_id =  req.params.id;
    try{
        const fetchedDataForHomeById= await productModel.find({"_id":p_id})
        console.log(fetchedDataForHomeById)
        res.json({
            data: fetchedDataForHomeById,
            error: null,
            code: 200
        }).status(200)

    }
    catch (error) {
        res.json({
            error: "Something went wrong",
            data: null,
            code: 500
        })
    }
}