// const mongoose = require("mongoose");


// // schema = formate ki kiss formate me aap data ko databse me store krwana chahte ho
// const noteSchema = new mongoose.Schema({
//     title:String,
//     description:String
// })


// // database me kuchh bhi operation performe krna hai to model create krna hota hai 
// // lekin databse me apko CRUD operation perform krna hai 
// // create ,read , update,delete to 


// // model = collection , sabhi note ka data jiska formate same ho to usse collection bna diya jata hai
// // notes is a collection of note
// const noteModel  = mongoose.model("notes" , noteSchema)

// module.exports = noteModel;

// ===================================
const mongoose  = require("mongoose");

const noteScheme  = new mongoose.Schema({
    title:String,
    description:String,
})

const noteModel = mongoose.Model("notes",noteScheme);

module.exports = noteModel ; 