const express = require('express');
const connectDB = require('./config/database')
const User = require("./models/user")
const {validateSignUpData}= require("./utils/validation")
const bcrypt = require("bcrypt");
const validator = require("validator")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");
const getJWT = require("./models/user")
const validatePassword = require("./models/user")
const app = express();



//express gives  a middleware whoch converts JSON objects to js object which sever can understand 
app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req,res)=>{


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

   
        await user.save();
    res.send("User added successfully ")}
    catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
    
})

app.post("/login", async (req,res)=>{ 
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
        res.send("Login Successfull !!!")
     }
     else{
        throw new Error("Invalid Credentials  ")
     } 
  }
  catch(err){
    res.status(400).send("ERROR :" + err.message);
  }
})

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth , async (req,res)=>{
   //sending connection request
   const user= req.user
   console.log("Sending a connection request")
   res.send( user.firstName + "sent the Connection request  !!")
})



connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("server is running successfully on 7777")
    });
 })
 .catch((err)=>{
     console.log("Database cannot be connected y")
 })
 

//NEVER TRUST REQ.BODY
