// this ile is user for performing a routes separatly to  keep clean our app.js file

// esse pahle routing wala kaam app.js me kr diya jata tha

// yha create kronge or export krke app.js me use kr lenge

const express = require("express");
const userModel = require('../models/user.model');
const bcrypt = require("../src/app")

const JWT = require("jsonwebtoken");



// why use = app.js ke alawa kissi or file ko routes create krne ke liye use kroge to ye likhna padega
const authRouter = express.Router()

// registor kro user ko db me 
// POST  /api/auth/register
authRouter.post("/register" , async  (req,res)=>{
    const {email,name , password} = req.body;

   const isUserAlreadyExist = await userModel.findOne({email})
   


    
//   const hasPass = await bcrypt.hash(password);
   
   if(isUserAlreadyExist){
       return res.status(400).json({
           message:"this user already exist try another email",
           
        })
    }

   

    const user = await  userModel.create({
        name, email , password
    })

     //  token  = is like a id card inside it user details and jwt signature  
    const token = JWT.sign(
        {
            id:user._id,
            email:user.email,
        },
        process.env.JWT_SECRET
    )
  


    // first bar user  register krega ya log in krega to server token bna ke bhejega or client ke cookie  storage me save ho jayega wo token 
    // jsika direct access server or DB  ke pass hoga
    // 


    // store cookie name jwt_token or uske under value token 
    res.cookie("jwt_token" , token)
    
    res.status(201).json({
        message:"user register",
        user,
        token
        
    })
     
})


// POST /api/auth/privet
authRouter.post("/privet", async (req,res)=>{
    console.log("this is privet field")
    
    res.status(400).json({
        message:"This is privet field"
    })
}) 
module.exports = authRouter;