const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const { validateSignUpData ,validateEditProfileData ,validateNewPassword} = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  });

  profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
      if (!validateEditProfileData(req)) {
        throw new Error("Invalid Edit Request");
      }
  
      const loggedInUser = req.user;
  
      Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
  
      await loggedInUser.save();
  
      res.json({
        message: `${loggedInUser.firstName}, your profile updated successfuly`,
        data: loggedInUser,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });



profileRouter.patch("/profile/password", userAuth,async (req,res)=>{
     try{
        if(!validateNewPassword(req)){
           throw new Error("Please a Strong new password");
        }
        const {password} = req.body;
        const passwordHash=  await bcrypt.hash(password,10);
        console.log(passwordHash);

        const loggedInuser= req.user;
        loggedInuser.password = passwordHash;


        await loggedInuser.save();

        res.send({message : `${loggedInuser.firstName},  Password changed successfully`, data : loggedInuser})
    
     }
     catch(err){
        res.status(400).send("ERROR: " + err.message);
     }
})


  module.exports = profileRouter;