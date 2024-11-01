const express = require('express');

const app = express();

const {adminAuth, userAuth}= require("./middlewares/auth")

//Hanle Auth Middlewares are used for all the request methods 
app.use("/admin",adminAuth)


app.use("/user",(req,res)=>{
       console.log("User data sent ");      
});

app.use("/user/login",userAuth,(req,res)=>{
    console.log("user login successfully ");      
});




app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data sent")
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted aUser")
})


// app.use("/user",(req,res,next)=>{
//     console.log("Handling the Route user 1 !!");
//     next();
//     //res.send("1st Response")
     
// },
// [(req,res,next)=>{
//     console.log("Handling the Route user 2 !!")
//     //res.send("2nd Response")
//     next();
// },
// (req,res)=>{
//     console.log("Handling the Route user 3 !!")
//     res.send("3rd Response")
// }]
// )



app.listen(7777,()=>{
    console.log("server is running successfully on 7777")
});
