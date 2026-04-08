const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser")


const multer = require("multer");
// const storage = multer.memoryStorage();
const upload = multer({storage :multer.memoryStorage()})


const app = express();


// ===================================
// middlewares
// ===================================

// 

// express ko call krne ke bad pahla kaam app.use(express.json()); middleware add kro 
app.use(express.json());
// calling the cooke-parser and use as a middleware
app.use(cookieParser())


// Require Routes
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.router")


// using routes
app.use("/api/auth",authRouter);
app.use("/api/posts",upload.single("image_url") ,postRouter );
app.use("/api/user" , userRouter) 

// uload.single ke under user jiss name se file bhej rha hai wo name likhna pdega


// =====================================

module.exports = app ;  