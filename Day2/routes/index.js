const express = require('express'); // Import the Express library

const app = express(); // Create an instance of an Express application
const port  = 3000; // Define the port number

app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`); // Log a message when the server starts
})
// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!'); // Send a response when the root URL is accessed
});