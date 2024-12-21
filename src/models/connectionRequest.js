const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
     fromUserId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",//reference to the user collect ion
        required : true,
     } ,
     toUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
     },
     status :{
        type : String,
        required : true,
        enum :{
            values:["ignored","interested","accepted","rejected"],
            message :`{value} is incorrect status type `
        },
     }
},{timestamps : true });


const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports = ConnectionRequestModel ;