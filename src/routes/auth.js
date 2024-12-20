const express = require("express");
const User = require("../models/user")
const authRouter = express.Router()
const {validateSignUpData}= require("../utils/validation")
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req,res)=>{


    try{
    //validation of data 
    validateSignUpData(req);


    //Encrypt the password
    const {firstName,lastName,emailId,password}= req.body;

    const passwordHash=  await bcrypt.hash(password,10);
    console.log(passwordHash)

    const userObj = {
        firstName,lastName ,emailId,
        password : passwordHash,
    };
    //creating a new instance of user model and passing data into it
    const user = new User(userObj);
    //save the data into database 

   
        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        //Add the token to cookie and  send rthe response back to the user
          
          res.cookie("token",token,{ expires: new Date(Date.now() + 900000)});
          
        res.json({ message : "User added successfully ", data : savedUser})
  }
    catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
    
});

authRouter.post("/login", async (req,res)=>{ 
    try{
      const {emailId,password}= req.body;
      // if(!validator.isEmail(emailId)){
      //     throw new Error("Email is not valid")
      //  };
  
       const user = await User.findOne({emailId:emailId});
       if(!user){
          throw new Error("Invalid Credentials")
       }
       const isPasswordValid = await user.validatePassword(password);
       if(isPasswordValid){
  
        
          const token = await user.getJWT();
        //Add the token to cookie and  send rthe response back to the user
          
          res.cookie("token",token,{ expires: new Date(Date.now() + 900000)});
          res.send(user);
       }
       else{
          throw new Error("Invalid Credentials  ")
       } 
    }
    catch(err){
      res.status(400).send("ERROR :" + err.message);
    }
  })

authRouter.post("/logout", async (req,res)=>{
    //Clean up activities are done for logout in big company website
    //No authentication is required for logout API because it doesn't matter the user is loggedIn or not .we can call logout anyway;
    //set the cookie token to null and set the expiry time to now 
    res.cookie('token',null, {expires : new Date(Date.now()),httpOnly: true,})

    res.send("Logout successfull !!!")
})






module.exports=authRouter ;