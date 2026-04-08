const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:[true, "Followers is required"]
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:[true, "Followee is required"]
    }
});

const FollowersModel = mongoose.Model("Follow" , followerSchema)

module.exports = FollowersModel;