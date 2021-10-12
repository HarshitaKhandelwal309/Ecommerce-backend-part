//import userModel from user.model.js
const userModel = require("../models/user.model")

//require bcrypt 
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()


//signInController simultaneously exporting 
exports.signInController = async(req, res) => {
    console.log("body is: ",req.body)
    try {
        const user = await userModel.findOne({ email: req.body.email })
        console.log(user);
        if (!user) //validate user is correct or not 
            return res.status(404)
            .json({
                error: "User doesn't exist",
                data: null,
                code: 404
            });
            //now check password is correct or not
        const comparePassword = await bcrypt.compare(req.body.password, user.password) // normal password , hashed passord
        if (!comparePassword) // if password doesnt match 
        {
            return res.json({
                error: "Invalid Password",
                data: null,
                code: 404
            }).status(404)
        }    
       
            //generate token 
            //jwt.sign(payload, secret key , algo)
        const token = jwt.sign({
                _id: user._id
            },
            process.env.SECRET_Key)
        console.log(token);
          user.password=undefined; //becz it will not show password on the console
              
        res.json({
                data: { user, token },
                error: null,
                code:200
            }).status(200)
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
            data: null,
            code: 500
        }).status(500)
    }

}

//signUpController

exports.signUpController = async(req, res) => {
    const isAdmin = req.query.isAdmin; //true, false
   
   
    try {
        if (isAdmin == "false") {
            const newUser = new userModel({

                email: req.body.email,
                password: req.body.password,
                role: "USER"

            });

            console.log(newUser);
            // bcrypt :to hash our password before saving password to DB
            // const salt = await bcrypt.genSalt(10); //generate salt
            const hashPassword = await bcrypt.hashSync(req.body.password, 12);
            //const hashedPassword = await bcrypt.hash(, salt); // store hash password
            newUser.password = hashPassword; // modify value of password and replace it with  hashedPassword
            const doc = await newUser.save(); // save data to DB 
            res.json({
                data: doc,
                err: null,
                code: 200
            }); // response

        } else {
            const newUser = new userModel({
                email: req.body.email,
                password: req.body.password,
                role: "ADMIN"

            });
            // bcrypt :to hash our password before saving password to DB
            // const salt = await bcrypt.genSalt(10); //generate salt
            const hashPassword = await bcrypt.hashSync(req.body.password, 12);
            //const hashedPassword = await bcrypt.hash(, salt); // store hash password
            newUser.password = hashPassword; // modify value of password and replace it with  hashedPassword
            const doc = await newUser.save(); // save data to DB 
            res.json({
                data: doc,
                err: null,
                code: 200
            }); // response
        }

    } catch (err) {
        console.log("error", err) // will give error
        res.json({
            error: "Something went wrong",
            data: null
        })
    }
}