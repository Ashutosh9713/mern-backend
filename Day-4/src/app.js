// 
// mainly two workflows:
// -server creates krna 
// -server config krna 


const express = require('express');
// server create krne k liye express ko import krna padta hai
// require means import

const app = express();
// jab express ko call kroge to server create ho jat hai

// endpoints create krna hai 
app.get('/' , (req , res)=>{
    res.send('Hello world')
})

const notes = [
    {
        'id': 1,
        'title': 'My first note',
        'content': 'This is my first note'
    },
    {
        'id': 2,
        'title': 'My second note',
        'content': 'This is my second note'
    }
]
    


app.use(express.json());  // ye middleware hai jo express ko json data samjhne me help krta hai
/*

*/

// clint post method se data bhejega to server us data ko kaise handle karega
// post request handle krne k liye express me ek method hota hai .post

// POST  / notes 
app.post('/notes' , (req , res)=>{
    console.log(req.body);      // middleware use krna padta hai json data ko handle krne k liye
                                // we can see undefined because by default express server does not understand json data
                                // we have to configure it to understand json data
     notes.push(req.body);      // jo data client se aaya hai usko Notes array me push krna hai
     console.log(notes);        // Notes array me data add ho gaya hai ya nahi ye check krne ke liye
     res.send('Notes received')

})

app.get('/notes' , (req , res)=>{
   res.send(notes)   // Notes array ko json format me client ko bhejna hai
   res.send('Notes sent')   // client ko response bhejna hai ki Notes array bhej diya hai
})


// :index  = params use tab krte hai jab single data ko access krna hota hai  wrna req.body ka use krte hai 
// : is must , bin acolon ke req.params kam nahi krta 

app.delete('/notes/:index',(req,res)=>{
     const index = req.params.index;
     delete notes[index]; 
  
     console.log(index);
    //  notes.splice(index,1);
     res.send('Note deleted')
});

/*
PATHCH /notes/:index
req.bod = {description :- "sample description"}
 */

app.patch("/notes/:index" , (req,res)=>{
    const index = req.params.index;
    notes[index].description = req.body.description;
    res.send('Note updated');
})
   


module.exports = app;
// ab is app ko use krke server ko configure krna hai