const mongoose = require("mongoose");
const  connectToDB = () =>{
    // ye niche wala uri cluster tak ka hai lekin hme database se connect krna hota hai to 
     mongoose.connect("mongodb+srv://aashutoshsharma9713_db_user:9FG1gMrjTpG23RAw@cluster0.oms2c2a.mongodb.net/day-6")
     .then(()=>{
        console.log("connected to database successfully");
     }).catch(()=>{
        console.log("error to connection");
     })
}

module.exports = connectToDB;