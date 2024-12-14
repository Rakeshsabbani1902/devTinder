const express = require('express');
const connectDB = require('./config/database')
const validator = require("validator")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const getJWT = require("./models/user")
const validatePassword = require("./models/user")
const app = express();

//express gives  a middleware whoch converts JSON objects to js object which sever can understand 
app.use(express.json());
app.use(cookieParser())

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


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
