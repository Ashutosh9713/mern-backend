const express = require("express");

const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");
const userRouter = express.Router();

/*
@route POST /api/users/folloe/:userid
@description Follow a user
@access Privet
 
 */

userRouter.post("/folloe/:uerid"  ,identifyUser, userController)

module.exports = userRouter ; 