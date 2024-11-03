const express = require('express');
const connectDB = require('./config/database')
const User = require("./models/user")
const app = express();

app.post("/signup",async (req,res)=>{
    const userObj = {
        firstName :"Virat",
        lastName :"Kohli",
        emailId : "kohli183.com",
        password :"kohli@183"
    }
    //creating a new instance of user model and passing data into it
    const user = new User(userObj);
    //save the data into database 

    try{
        await user.save();
    res.send("User added successfully ")}
    catch{
        res.status(400).send("Error saving the message" + err.message);
    }
    
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
 


