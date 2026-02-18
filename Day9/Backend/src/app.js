// main work
// server ko create krna 
const express = require("express");
const noteModel = require("./models/note.model")
const app = express();
const cors = require("cors");
const path = require("path")

// middleware to let express to understand json 
app.use(express.json())
app.use(cors())

app.use(express.static("./public"))

// har random api me index.html bhej diya wild card se but usme css or js field me bhi index.html jata hai , esse tackel krne ke liye app.use(express.static("./public krna hota hai "))

// public ke under html css js file hai wo sb ke liye available bna deta hai uper wala middleware

/*
 -POST /api/notes
 req.body = {titile , description }

 -create new note and save data in mongodb
  await noteModel.create({titile,description})

*/

app.post('/api/notes', async (req,res)=>{
    // data clint se destructure krke le liya 
    const {title , description} = req.body

    // database me new note crate krega
   const note =  await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"note created sucsessfuly"
    })

})
/* get
    /api/notes
    fetch all the data from the database and send them
    // res.send(notes);
 */

app.get("/api/notes", async (req,res)=>{
    const notes =   await noteModel.find()
    

    res.status(200).json({
        message:"notes sended sucessfully",
        notes
    })
})
// delete note by id 

app.delete("/api/notes/:id" , async (req,res)=>{
      const id = req.params.id

      await noteModel.findByIdAndDelete(id)

      res.status(200).json({
        message:"Note deleted successfully",     
      })
})

// patch req for updating description

app.patch("/api/notes/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const {title,description} = req.body
        await noteModel.findByIdAndUpdate(id,{title,description});
  
        res.status(200).json({
          message:"note updated successfully",
        
        
        })

    }catch{
        console.log("error while updating")
        res.send("error while updating")
    }
})



// __dirname  = app.js file jiss oleder ke under hai uss folder tak ka path hame dekhne ko mil jata hai 


// wild card api jo har ramdom api pe resonse kre
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,".." , "/public/index.html"))
})


module.exports = app;