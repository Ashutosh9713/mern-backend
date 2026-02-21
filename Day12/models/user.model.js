const mongoose = require('mongoose');


// schema formate bnana
const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"this email address is already exist "]
    }, 

    password:String,
})

// ye uper wale formate ke data kiss collection me save higa
// kuchh bhi operation perform krne ke liye user ke uper
const  userModel = mongoose.model("users" ,userSchema );

module.exports = userModel;