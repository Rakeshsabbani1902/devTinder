
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//  const adminAuth = (req,res,next)=>{
//     console.log("Admin Auth is getting checked");
//     const token = "xyz";
//     const isAdminAuthorized = token ==="xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("unAuthorized request");
//     }
//     else{
//         next();
//     }
    
// }

const userAuth = async (req,res,next)=>{
    //Read the token from the req cookies 
   try{
    const cookies = req.cookies;
   const {token}= cookies;
   if(!token){
     return res.status(401).send("Please Login !")
   }

   const decodedData  = await jwt.verify(token,"DEV@Tinder$183");

   const {_id}= decodedData;
   const user = await User.findById(_id);
   if(!user){
     throw new Error("User not found")
   }
   req.user = user;
   next();
   

   }
   catch(err){
    res.status(400).send("ERROR :" + err.message);
   }
  
}

module.exports = {userAuth}