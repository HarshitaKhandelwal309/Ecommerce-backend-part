const userModel = require("../models/user.model")
const checkExists = async(req, res, next) => {
    try {
        const status = await userModel.exists({
            email: req.body.email
        });
        if (status) {
            res.json({
                error: "User already exists",
                data: null,
                code: 404
            })

        } else {
            return next();
        }
    } catch(error) {

        res.json({
            error: "Internal server error",
            code: 500
        })
    }
}
module.exports = checkExists;