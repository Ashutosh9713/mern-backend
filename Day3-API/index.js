const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const notes  = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2024-06-10T17:30:31.098Z",
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript", 
        date: "2024-06-10T18:39:34.091Z",
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2024-06-10T19:20:14.298Z",
    }
]

app.get('/',(req,res)=>{
    res.send("Hello wolrd");
})

app.get('/api/notes',(req,res)=>{
    res.json(notes);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

