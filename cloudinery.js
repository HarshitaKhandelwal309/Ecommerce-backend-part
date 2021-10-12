const cloudinary= require("cloudinary").v2;
require('dotenv').config()
cloudinary.config(
    {
        cloud_name: "dfrbfb7sv",
        api_key: "366335345874698" ,
        api_secret:process.env.cloud_secret
    }
)
module.exports = {cloudinary}