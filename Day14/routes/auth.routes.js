const express = require("express");
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken");



const authRouter = express.Router();


// post /api/auth/register

authRouter.post("/register"  , async (req,res)=>{
       const {username , email , password , bio } = req.body;
       console.log(req.body);

       const isUserAlreadyExist = await userModel.findOne({
        $or:[{email},{username}]
       })

       if(isUserAlreadyExist) {
              return res.status(409).json({
                    message:"User already exists" + (isUserAlreadyExist.email===email ? "Email already exists": "Username already exist")
                    
              })
       }

       // hashing the password

      const hash = crypto.createHash("sha256").update(password).digest("hex")

        const user = await userModel.create({
              username ,
              email ,
              password:hash,
              bio ,
             
       })
       
        const token  = jwt.sign({
              email,
              password:hash,
       },
       process.env.JWT_SECRET,
       {
              expiresIn:"1d"
       }
        )
       
        res.cookie("token" , token);
        res.status(201).json({
              message:"user is register successully",
              user:{
                     email:user.email,
                     username:user.username
              }
        })

      

})

authRouter.post("/login",async (req , res)=>{
       const {email, password} = req.body

       const isUserAlreadyExist  = await mongoose.findOne({email});

       if(!isUserAlreadyExist){
              return 
       }
})



module.exports = authRouter ; 

