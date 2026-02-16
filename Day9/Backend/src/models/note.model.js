const mongoose = require("mongoose");



// note kiss formate me create hoga usse schema bolte hai 
const noteSchema = new mongoose.Schema({
    titile:String,
    description:String,
})


// sirf ek note create mhi hoga bhut sara note mil ke notes me rkha jayega wo note noteschema ka formate use krega usse model bolte hai
// collection = model , sara bhut sara note mil 
// collection name = notes
const noteModel = mongoose.model("notes",noteSchema)

module.exports = noteModel;