const mongoose = require("mongoose");
const  connectToDB = () =>{
    // ye niche wala uri cluster tak ka hai lekin hme database se connect krna hota hai to 
     mongoose.connect(process.env.MONGO_URI)
     
     .then(()=>{
        console.log("connected to database successfully");
     }).catch(()=>{
        console.log("error to connection");
     })
}

module.exports = connectToDB;