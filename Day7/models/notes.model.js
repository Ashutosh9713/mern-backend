const mongoose = require("mongoose");

// schema is like ka formate you told  the databse in witch formate data is stored in the databse

const noteSchema = new mongoose.Schema({
    title:String,
    description: String

})

// tum kissi bhi prakar ke operation chahte ho apne database me to uske liye models bnana pdta hai

// same kind of data store hota hai collection 
// bina model ke CRUD operation perform nhi ho skta database se
const noteModel = mongoose.model("note", noteSchema)

module.esport = noteModel;