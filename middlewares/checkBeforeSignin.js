const userModel = require("../models/user.model")
const checkBefore = async(req, res, next) => {
    try {
        const status = await userModel.exists({
            email: req.body.email
        });
        if (status) {
            return next();
        } else {
            res.json({
                error: "User does not exists",
                data: null,
                code: 422
            }).status(422)

           
        }
    } catch (error){

        res.json({
            error: "Internal server error",
            code: 500
        })
    }
}
module.exports = checkBefore;