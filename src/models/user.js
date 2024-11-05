const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName :{
        type : String ,
        required: true,
        minLength : 4,
        maxLength : 50 ,
    },
    lastName :{
        type : String 
    },
    emailId:{
        type : String ,
        lowercase : true ,
        required: true, 
        unique: true,
        trim : true , 
    },
    password:{
        type : String ,
        required:true ,

     },
    age :{type : Number,
        min: 18, 
        max: 60 ,
      },
    gender :{
        type : String ,
        validate(value){
            if(!["male","female","others"].includes(value)){
              throw new Error("Gender is not valid ")
            }
        }
     },
    photoUrl:{
        type :String,
        default :"https://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png"
    },
    about :{
        type : String ,
        default :"This is a default about of the user"
    },
    skills :{
        type :[String],
    },
},{
    timestamps:true,
})

const User = mongoose.model("User",userSchema)

module.exports = User;