const app = require("./src/app")
const connectToDB = require("./config/database");
require("dotenv").config()

app.listen(3000 , ()=>{
    console.log("server is listen on port 3000")
})

connectToDB()