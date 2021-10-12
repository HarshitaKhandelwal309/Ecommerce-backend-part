const mongoose = require('mongoose');
// import mongoose from 'mongoose';
require('dotenv').config()
mongoose.connect(process.env.MONGODBURL)
    .then((data) => console.log("Connected to Database "))
    .catch((err) => console.log(err, "Not Connected"))