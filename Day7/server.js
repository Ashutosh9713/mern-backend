const app = require("./src/app");

// dotenv ke variable use krne ke liye dotenv ko import kro or config krna pdta hai 
require("dotenv").config();
const connectedToDB = require("./src/config/Database")

app.listen(3000,()=>{
     console.log("server is running on port no. 3000")
})
connectedToDB();