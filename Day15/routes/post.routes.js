const express = require("express");
const userModel = require("../models/user.model")
const postRouter = express.Router();
const postController = require("../controllers/post.controller");

/**
 * 
// post  /api/auth/posts [protected]
         protected api = can be accesable for registered user only 
// req.body  = {caption , image-file , }
 * 
 */


// postRouter.post("/post" , async (req,res)=>{
//       console.log(ewq.body ,req.file)

// })
// jo api ke bad ka callback fucntion hota hai usko controller bola jata hai

postRouter.post("/" , postController.createPostController)

module.exports = postRouter