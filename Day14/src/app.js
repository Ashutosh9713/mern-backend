const express = require("express");
const authRouter = require("../routes/auth.routes");
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
// calling the cooke-parser and use as a middleware
app.use(cookieParser())

// middleware 

// useing prefix 
app.use("/api/auth",authRouter)




module.exports = app ;  