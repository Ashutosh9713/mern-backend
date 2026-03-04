const express = require("express");
const userModel = require("../models/user.model")
// const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const cookie = require("cookie-parser");
const mongoose = require("mongoose")


// =======================================
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const plainPassword = 'user_password';

// // Hash
// const hash = await bcrypt.hash(plainPassword, saltRounds);

// // Verify
// const match = await bcrypt.compare(plainPassword, hash);

// =====================================================

const authRouter = express.Router();


// post /api/auth/register


// register user successfull
authRouter.post("/register", async (req, res) => {
       const { name, email, password, bio } = req.body;
       console.log(req.body);

       // =========================
       // bad option
       // =========================
       // db ko 2 bar req send krna padega ek bar email ke basis pe check krne ke liye or ek bar password ke basis pe check krne ke liye
       // database se single data ke basis pe check krne ke liye
       // const isUserAlreadyExist = await userModel.findOne({{email}})
       
       
       // =======================
       // good option
       // =======================
       // single req se hi databse se value la skte hai
       // DB se dubble value se check krne ke liye $or:[{email},{password}] dono mese ek bhi value milega to true return krega
       const isUserAlreadyExist = await userModel.findOne({
              $or: [{ email }, { name }]
       })
       
       if (isUserAlreadyExist) {
              return res.status(409).json({
                     //       message:"User already exists" + (isUserAlreadyExist.email===email ? "Email already exists": "Username already exist")
                     message: `User already exists ${isUserAlreadyExist.email === email ? "Email already exist" : "Username aready exist"}`
                     
              })
       }
       // if (!username) {
              //        return res.status(400).json({
                     //               success: false,
                     //               message: "Name is required"
                     //        });
                     // }
                     
       // hashing the password
                     
                     // const hash = crypto.createHash("sha256").update(password).digest("hex")
                     
       const saltRounds = 10;
       const hash = await bcrypt.hash(password, saltRounds);

       const user = await userModel.create({
              name,
              email,
              password: hash,
              bio
       })


       // creating a token by unique userdetail and jwt_secret
       const token = jwt.sign({
              email,
              password: hash,
            },
              process.env.JWT_SECRET,
              {
                     expiresIn: "1d"
              }
       )

       //  set token in cookie ("kon se name se save krna hai" , " kon sa token save krna hai")
       res.cookie("token", token);

       //  sending response to user
       res.status(201).json({
              message: "user is register successully",
              user: {
                     email: user.email,
                     name: user.name
              }
       })



})


// post /api/auth/login  

// authRouter.post("/login",async (req , res)=>{
//        const {email, password} = req.body

//        const isUserAlreadyExist  = await mongoose.findOne({email});

//        if(!isUserAlreadyExist){
//               return res.status(404).json({
//                      message:"User not found"
//               })
//        }
//         const hashPassword = await bcrypt.hash(password , 10);

//        const isPasswordMatch  = await bcrypt.compare(hashPassword , isUserAlreadyExist.password);

//        if(!isPasswordMatch){
//               return res.status(401).json({
//                      message:"Invalid Password"
//               })
//        }
//        const token  = jwt.sign({
//               email ,
//               password:hashPassword
//        },
//        process.env.JWT_SECRET,
//        {
//               expiresIn:"1d"
//        }
//        )             
       
//        res.cookie("token" , token );

//        res.status(200).json({
//               message:"Login successfully",
//               user:{
//                      email: isUserAlreadyExist.email,
//                      name: isUserAlreadyExist.name
//               }
//        })

// })

// loggin is route is successully created
authRouter.post("/login" , async (req,res)=>{
       // user email or password req.body me  bhejega usko  detructure kr lena hai 
       const {email , password} = req.body;

       // mongoose.findOne krke email ke through user identify kr lena hai 
       const isUserAlreadyExist = await userModel.findOne({email});


       // agr user null aaya to  return krwa dena hai
       if(!isUserAlreadyExist){
           return    res.status(404).json({
                     message:"User not exist please register user"
              })
       }
       // hash kro password using bcrypt
       const hashPassword = await  bcrypt.hash(password , 10) ;

       // compare kro register user ke password jo ki hash me save hai 
       const isPasswordMatch =  bcrypt.compare(hashPassword  ,isUserAlreadyExist.password )

//       agr match ni krta hai password to return krwa do 
       if(!isPasswordMatch){
            return   res.status(409).json({
                     message:"Incorrect password"
              })
       }
       // age password correct hota hai
       // token create kro

       const token = jwt.sign({
               email:email,
               password:hashPassword,
       },
       process.env.JWT_SECRET,
       {
              expiresIn:"1D"
       }
        )

       //  token ko cookies me save kro
       res.cookie("token" , token)

       return  res.status(200).json({
              message:"User logged in ",
              user:{
                   name :   isUserAlreadyExist.name,
                   email:isUserAlreadyExist.email
              }
       })
       
        


})


module.exports = authRouter;

