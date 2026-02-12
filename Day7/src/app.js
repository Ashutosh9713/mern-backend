const express = require("express");
const notemodel = require("../models/notes.model")

const app = express();



/*
POST /notes
req.body => {title , description}
*/
// internet ke
app.get("/notes", async (req , res)=>{
  // notemodel.find method database se data leta hai or notes variable me store krwa lenge

  // find method hamesha array of object ke form me data return krti hai
  const notes = await notemodel.find();

  res.status(200).json({
    message:"Notes fetched successfully",
    notes
  })
 
})
// middilware jisse apka express json ko understand krega eske bina express smjh req ko smjh nhi skta 
app.use(express.json());

app.post("/notes", async (req,res)=>{
  try{

    const {title , description} = req.body;

    const note = await notemodel.Create({
      title , description
    })
    res.status(201).json({
      massage:"note created successfully",
      note
    })
  }
  catch{
    res.status(500).json({
      massage:"Error creating notes",
      error: "error.message"
    })
  }
})

module.exports = app ;