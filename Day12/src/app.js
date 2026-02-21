const express = require('express')
const authRouter = require("../routes/auth.routes")
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');

const app = express()

app.use(express.json());
app.use(cookieParser());

// api ka preix hai 
app.use("/api/auth" , authRouter)

module.exports = app ; 