const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://rakeshsabbani183:Rakesh%401@namastenode.5ydle.mongodb.net/devTinder")
}


module.exports = connectDB
