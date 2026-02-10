const express = require("express");
const noteModel = require("../models/notes.model")

const app = express();


// middilware jisse apka express json ko understand krega eske bina express smjh req ko smjh nhi skta 
app.use(express.json());

/*
  POST /notes
  req.body => {title , description}
*/
// internet ke
app.post("/notes", async (req,res)=>{
    const {title , description} = req.body;

    const note = await noteModel.Create({
      title , description
    })
    res.status(201).json({
      massage:"note created successfully",
      note
    })
})

module.exports = app ;