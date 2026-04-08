const express = require('express');
const followModel =require("../models/follow.model")


async function followUserController(req,res){
    const id = req.user.id ;
    const followeeId = req.params.username;

}

module.exports = {
    followUserController
};