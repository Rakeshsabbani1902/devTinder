const express = require('express');

const app = express();




//this will only GET Call to /user
app.get("/user",(req,res)=>{
    res.send({firstname : "Rakesh", lastname :"Sabbani"})
})


//this will only POST Call to /user
app.post("/user",(req,res)=>{
   //Save data to DB
   res.send("Data saved successfully to the database");
})

//this will only DELETE Call to /user
app.delete("/user",(req,res)=>{
    res.send("Deleted successfully")
})



//this will call all the HTTP Method API calls to /test
app.use("/test",(req,res)=>{
    res.send("Hello from the server")
})



app.listen(7777,()=>{
    console.log("server is running successfully on 7777")
});
