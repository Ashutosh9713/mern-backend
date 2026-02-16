const mongoose = require('mongoose');

function connectToDB(){
     mongoose.connect(process.env.MONGO_URI)
     .then(()=>{
        console.log("Connected to DB")
     }).catch(()=>{
        console.log("error occure while connection with cluster")
     })
}

module.exports = connectToDB;
