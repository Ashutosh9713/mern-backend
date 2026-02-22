const mongoose = require("mongoose");


const userSchema = new  mongoose.Schema({
      username:{
        type:String,
        unique:[true , "this username is already exist "],
        require:true,
        trimg:true
      },
      email:{
         type:String,
         unique:[true , "this email is already exist"],
         require:true,
      },
      password:String , 
      bio:String,
      profile:{
        type:String,
        default:"https://ik.imagekit.io/bd5pedkfq/defaultuserimage.avif"
      }

})


const userModel = mongoose.model("user" , userSchema);

module.exports = userModel ; 