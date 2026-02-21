const express = require('express');
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto  = require("crypto");



// authentication : btata hai ki user kon hai  

// authentication use krne ke liye auth ko valid authentication express se allow krwana hoga 

const authRouter  = express.Router()


// registoration for user 
// post /api/auth/register

authRouter.post('/register', async (req , res)=>{
     const {email,name , password} = req.body;

     isUserAlreadyExist = await userModel.findOne({email});

     if(isUserAlreadyExist){
        return  res.status(409).json({
            message:"this user already exist try another email"
        }) 
     }
     
     const user = await userModel.create({
        name,
        email,
        password: crypto.createHash("sha256").update(password).digest("hex")
       
     })

     const token = jwt.sign(
    {
      id:user._id,
      email:user.email
     },
     process.env.JWT_SECRET,
     {
      expiresIn: "1hr"
     }
     
    )
    

   //  isname ka , ye token save krdo
    res.cookie("JWT_TOKEN" , token)

    res.status(201).json({
      message:"user register",
        user,
        token
        

    })
})

// post /api/auth/get-me

authRouter.get("/get-me" , async ( req,res)=>{
   const token = req.cookies.JWT_TOKEN;

   if(!token){
      return res.status(401).json({
         message:"token not receaved"

      })
   }

 const decoded =   jwt.verify(token , process.env.JWT_SECRET);
//   decoded me id hoga essi id se user kofind krenge

const user = await userModel.findById(decoded.id);



 res.status(201).json({
     message:"this is the ",
     name: user.name,
     email: user.email
 })


})


// post  /api/auth/login

authRouter.post("/login" , async (req,res)=>{
   const {email , password} = req.body;

   const user = await userModel.findOne({email});

   if(!user){
     return res.status(404).json({
      message:" This email is not registerd"
     })
   }
  
// hashing me same input do same output milega
   const hashpass = crypto.createHash("sha256").update(password).digest("hex");
  
   const isPasswordValid = hashpass === user.password

   if(!isPasswordValid){
      res.status(401).json({
         message:"Invald password"

      })
   }
    
   const token = jwt.sign(
      {
         id:user._id,
         email:user.email
      },
      process.env.JWT_SECRET,
      {
         expiresIn:"1hr"
      }
   )

   res.cookie("JWT_TOKEN" , token)

   res.status(201).json({
      message:"You are logged in successfully",
      user,
      token

   })

   


  


})

module.exports = authRouter ; 