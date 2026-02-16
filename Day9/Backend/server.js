// main work of server .js
// server ko start krna 
// database se connect krna


const app = require("./src/app");
const connectToDB  = require("./src/config/database")

require('dotenv').config();
// 

// database connection call
connectToDB();
// starting the server
app.listen(3000,()=>{
    console.log("server is running on port 3000")
    
})
