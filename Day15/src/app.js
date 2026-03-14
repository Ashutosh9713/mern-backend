const express = require("express");
const authRouter = require("../routes/auth.routes");
const cookieParser = require("cookie-parser")
const postRouter = require("../routes/post.routes");
const multer = require("multer");
// const storage = multer.memoryStorage();
const upload = multer({storage :multer.memoryStorage()})


const app = express();


// ===================================
// middlewares
// ===================================


// express ko call krne ke bad pahla kaam app.use(express.json()); middleware add kro 
app.use(express.json());
// calling the cooke-parser and use as a middleware
app.use(cookieParser())

// middleware 

// using prefix 
app.use("/api/auth",authRouter)

// using preix
app.use("/api/posts",upload.single("image_url") ,postRouter )

// uload.single ke under user jiss name se file bhej rha hai wo name likhna odega


// =====================================

module.exports = app ;  