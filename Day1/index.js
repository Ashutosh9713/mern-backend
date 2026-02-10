const express = require('express'); // Import the Express library

const app = express(); // Create an instance of an Express application
const port = 3000; // Define the port number

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});