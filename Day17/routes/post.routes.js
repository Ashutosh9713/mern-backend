const express = require("express");
const userModel = require("../models/user.model")
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const getPostDetailsController = require("../controllers/post.controller")
const identifyUser = require("../middlewares/auth.middleware");

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

postRouter.post("/" ,identifyUser , postController.createPostController)

/**
 * 
 * GET  /api/posts/  [protectted]
 */
postRouter.get('/' ,identifyUser , postController.getPostController)
// you have pending works
// postmen se ek user loggin kro
// postmen se ye api  hit krwao  or data mangwao
// thunder client user ko loggin kro
// thunder client se ye get api hit krwa ke data mangwao

// test kro jo post bnwaya gya tha uss user se wahi 

/**
 * 
 *  Get api/posts/details/:postid
 * return a details about specific post with id and also cgeck whether the post belongs to the user that the rquest come from
 */
postRouter.get("/details/:postId",identifyUser , postController.getPostDetailsController )


module.exports = postRouter