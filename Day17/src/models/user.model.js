const mongoose = require("mongoose");


// create schema 
const userSchema = new  mongoose.Schema({
      name:{
        type:String,
        required:true,
        trimg:true,
      },
      email:{
         type:String,
         unique:[true , "this email is already exist"],
         require:true,
      },
      password:String , 
      bio:String,
      profileImg:{
        type:String,
        default:""
      }
})


// wo schema se model create kro user name ka collection create hoga aur usme userSchema ke according data store hoga

const userModel = mongoose.model("user" , userSchema);
                              // ye name ka collection , ye schema ko use krte huye 

module.exports = userModel ; 