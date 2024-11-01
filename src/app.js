const express = require('express');

const app = express();


app.use("/user",(req,res,next)=>{
    console.log("Handling the Route user 1 !!");
    next();
    //res.send("1st Response")
     
},
[(req,res,next)=>{
    console.log("Handling the Route user 2 !!")
    //res.send("2nd Response")
    next();
},
(req,res)=>{
    console.log("Handling the Route user 3 !!")
    res.send("3rd Response")
}]
)



app.listen(7777,()=>{
    console.log("server is running successfully on 7777")
});
