const mongoose = require("mongoose")
// const userModel = require()

const postSchema = new mongoose.Schema({
      caption:{
        type:String,
        default:""
        
      },
      imgUrl:{
        type:String,
        required:[true,"ImageURl is required for creating post"]
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user id is required"]
      }
})

const postModel = mongoose.model("Posts  " ,postSchema )

module.exports = postModel;