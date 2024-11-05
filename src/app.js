const express = require('express');
const connectDB = require('./config/database')
const User = require("./models/user")
const {validateSignUpData}= require("./utils/validation")
const bcrypt = require("bcrypt");
const validator = require("validator")
const app = express();


//express gives  a middleware whoch converts JSON objects to js object which sever can understand 
app.use(express.json());
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
     const isPasswordValid = await bcrypt.compare(password,user.password)
     if(isPasswordValid){
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


//get user by email 
app.get("/user", async (req,res)=>{
   const userEmail = req.body.emailId;
  const id = req.body._id


//    //To find the  user by id 

//    try{
//     console.log(id);
//     const user = await User.findById(id);
//     if(!user){
//         res.status(404).send("User not found ")
//     }
//     else{
//         res.send(user);
//     }
   
//    }

//    catch(err){
//         res.status(400).send("Something went wrong");
//      }
   
   //To find the only one user

//    try{
//     const user = await User.findOne({emailId :userEmail});
//     if(!user){
//         res.status(404).send("User not found ")
//     }
//     else{
//         res.send(user);
//     }
   
//    }

//    catch(err){
//         res.status(400).send("Something went wrong");
//      }
   
   


    try{
    const users = await User.find({emailId :userEmail});
    if(users.length==0){
        res.status(404).send("User not found ")
    }
    else{
        res.send(users);
    }
   
   }
   catch(err){
     res.status(400).send("Something went wrong");
   }
   


})

//Feed API -GET/feed - get all the users form the database
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
       }
       catch(err){
         res.status(400).send("Something went wrong");
       }
    
})

//Delete a user from the database
app.delete("/user", async (req,res)=>{
    const userId = req.body._id;
    try{
       const user = await User.findByIdAndDelete({_id : userId})
       //const user = await User.findByIdAndDelete(userId)
        res.send("user deleted successfully")
       
    }
    catch(err){
      res.status(400).send("Soemthng went wrong")
    }
})

//Update a user from the db 
app.patch("/user/:userId", async (req,res)=>{
     const data  = req.body;
     //API Level validation
     const userId = req.params?.userId;

  
     
     try{

        const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];

        const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))
        if(!isUpdateAllowed){
           throw new Error("Update not allowed");
        }
        //Data Sanitization -API level validation
        if(data.skills>5){
            throw new Error("Skills can not be more than 10")
        }
         const user = await User.findByIdAndUpdate({_id : userId},data,{
            returnDocument:"after",
            runValidators :true,
        });
         console.log(user);
         res.send("user updated successfully")
     }
     catch(err){
        res.status(400).send("Update failed " +err.message);
     }

})

//update a user with email Id 

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
