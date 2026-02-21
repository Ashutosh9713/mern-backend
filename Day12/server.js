// server ko start krna + db se connection baithana 
const app = require('./src/app');
require('dotenv').config();
const connectToDB = require("./config/database")

app.listen(process.env.PORT, ()=>{
    console.log(`app is listen on post ${process.env.PORT}` )
});
connectToDB();
