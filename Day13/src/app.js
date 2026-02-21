const express = require("express");
require("dotenv").config();
const authRouter = require("../routes/auth.routes");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());

// use prefic api 
app.use("/api/auth" , authRouter)
app.use(express.json());

module.exports = app ; 
