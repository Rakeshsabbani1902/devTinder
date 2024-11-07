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


app.use("/getUserData",()=>{
    //always handle error using try and catch block 
    throw new Error("Something went wrong")
    res.send("user Data sent")
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

//always keep error handling using use in the end 
app.use("/",(err,req,res,next)=>{
    if(err){
        //Log your error
        res.status(500).send("something went wrong ")
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
 