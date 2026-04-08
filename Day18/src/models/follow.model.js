const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
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

const FollowModel = mongoose.Model("Follow" , followSchema)

module.exports = FollowModel;