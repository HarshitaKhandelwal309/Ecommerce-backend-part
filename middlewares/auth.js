//  import .env file
require('dotenv').config();
//import jwt 
const jwt = require('jsonwebtoken');
//import user model
const userModel = require('../models/user.model');
//authorization middleware logic for protected routes
const auth = async(req, res, next) => {
    try {
      
        //getting token from the request header and replace bearer with an empty string 
        let token = req.header("Authorization");
        token = token.replace("Bearer ", "");
        // console.log(`token is ${token}`)

        //check whether token is correct or not
        if (!token) {
            res.json({
                error: "Invalid authorization token",
                data: null,
                code: 401
            })
        }
        //verify token

        const decoded = await jwt.verify(token, process.env.SECRET_Key)
        console.log(decoded._id)
        const user = await userModel.findOne({
            _id: decoded._id
        })

        if (!user) {
            res.json({
                error: "Invalid user",
                data: null,
                code: 400
            })
        }

        //store user in req by updating its value
        req.user = user;
        next();


    } catch (error) {
        console.log(`error ${error}`)
        res.json({
            error: "Access Denied",
            data: null,
            code: 400
        })
    }
}

//export 
module.exports = auth;