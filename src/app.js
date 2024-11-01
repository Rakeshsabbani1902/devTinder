const express = require('express');

const app = express();

app.use("",(req,res)=>{
    res.send("Namaste  dashboard");
});

app.use("/profile",(req,res)=>{
    res.send("profile");
});

app.use("/test",(req,res)=>{
    res.send("Hello This is rakesh")
})

app.listen(7777,()=>{
    console.log("server is running successfully on 7777")
});
