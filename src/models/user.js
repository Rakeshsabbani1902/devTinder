const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    firstName :{
        type : String ,
        required: true,
        minLength : 4,
        maxLength : 50 ,
    },
    lastName :{
        minLength : 4,
        type : String 
    },
    emailId:{
        type : String ,
        lowercase : true ,
        required: true, 
        unique: true,
        trim : true , 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value)
            }
        }
    },
    password:{
        type : String ,
        required:true ,
        minLength : 4,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong password :"  + value)
            }
        }

     },
    age :{type : Number,
        min: 18, 
        max: 60 ,
      },
    gender :{
        type : String ,
        enum : {
           values : ["male","female","others"],
           message :`{value} is not valid gender type`
        },
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //       throw new Error("Gender is not valid ")
        //     }
        // }
     },
    photoUrl:{
        type :String,
        default :"https://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL"  + value)
            }
        }
    },
    about :{
        type : String ,
        default :"This is a default about of the user",
        
    },
    skills :{
        type :[String],
    },
},{
    timestamps:true,
});

userSchema.methods.getJWT = async function(){
//this keyword doesn't work in arrow functions , please normal fucntiona     
    const user = this ;
    //create a JWT Token
      const token = await jwt.sign({_id : user._id}, "DEV@Tinder$183",{
        expiresIn :"1d"
      });

      return token;
}


userSchema.methods.validatePassword = async function(passwordInputUser){
      const user = this ;
      const passwordHash = user.password;
      const isPasswordValid =await bcrypt.compare(passwordInputUser,passwordHash);

      return isPasswordValid;

}
const User = mongoose.model("User",userSchema)

module.exports = User;