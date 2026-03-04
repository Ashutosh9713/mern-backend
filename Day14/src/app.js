const express = require("express");
const authRouter = require("../routes/auth.routes");
const cookieParser = require("cookie-parser")

const app = express();
// express ko call krne ke bad pahla kaam app.use(express.json()); middleware add kro 
app.use(express.json());
// calling the cooke-parser and use as a middleware
app.use(cookieParser())

// middleware 

// useing prefix 
app.use("/api/auth",authRouter)






module.exports = app ;  