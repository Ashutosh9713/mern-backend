const express = require('express');
const app = express();
const port = 3000;

app.listen(port , (req,res)=>{
    console.log(`Server is running on http://localhost:${port}`);
}) 
app.get('/',(req , res)=>{
    res.send('Hello , world!');
});
app.get('/About',(req , res)=>{
    res.send('This is About page');
});
app.get('/Contact',(req , res)=>{
    res.send('This is Contact page');
});
