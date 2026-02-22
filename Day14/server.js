 require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./config/database");


connectToDB();

app.listen(3000 , (req,res)=>{
    console.log("server is listen on port 3000");
})

