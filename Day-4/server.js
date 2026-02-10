// main work on server.js
// srever ko start krna 

const app = require('./src/app');
// app.js se server ka app le rhe hai

app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
})
