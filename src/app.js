const express = require('express');

const app = express();

//It will work for abc and ac , b is optional
app.get("/ab?c",(req,res)=>{
    res.send({firstname : "ab", lastname :"ab"})
})

//it will match the pattern 
app.get("/ab+c",(req,res)=>{
    res.send({firstname : "MS", lastname :"Dhoni"})
})

//Anything between ab and cd works 
app.get("/ab*cd",(req,res)=>{
    res.send({firstname : "Virat", lastname :"Kohli"})
})

//bc is optional
app.get("/a(bc)?d",(req,res)=>{
    res.send({firstname : "Virat", lastname :"Kohli"})
})

app.get(/a/,(req,res)=>{
    res.send("Regx Expression")
})


app.get(/.*fly$/,(req,res)=>{
    res.send("Regx Expression")
})

app.get("/user",(req,res)=>{
    console.log(req.query);
    res.send({firstname : "Rakesh", lastname :"Sabbani"})
})


app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstname : "Rakesh", lastname :"Sabbani"})
})

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
