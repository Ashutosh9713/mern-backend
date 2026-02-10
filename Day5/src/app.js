// app.js ka kaam server ko create krna
// server ko config krna 
// 
const express = require("express");

const app = express();

const notes = [
    {
        title: "title1",
        des: " description"
    },
    {
        title: "title2",
        des: " description 2"
    },
    {
        title: "title3",
        des: " description 3"
    },
]


app.post("/notes" , (req,res)=>{
      console.log(req.body);
      notes.push(req.body);
      console.log(notes);
      res.send("notes received");
})
app.get("/notes",(req,res)=>{
    res.send(notes);
    console.log("responce sended");
})
app.patch("/notes" , (req,res)=>{
      console.log(req.body);
      
    
})
app.get("/" , (req,res)=>{
     res.send(notes);
     res.send("notes send")

})

module.exports =  app ; 