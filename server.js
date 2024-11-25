const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from the public directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Define the random number route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Define the route for the Mad Lib form
server.get('/ITC505/lab-7', (req, res) => {
  res.sendFile(path.join(publicServedFilesPath, 'index.html'));
});

// Handle form submission
server.post('/ITC505/lab-7', (req, res) => {
  const { pluralNoun, adjective, verb, color, animal } = req.body;

  if (!pluralNoun || !adjective || !verb || !color || !animal) {
      res.send(`
          <h1>Submission Failed</h1>
          <p>Please fill out ALL fields</p>
          <a href="/ITC505/lab-7">Go Back to Form</a>
      `);
      return;
  }

  const madLib = `Yesterday, a group of ${pluralNoun} gathered in the ${adjective} park to ${verb} under the ${color} sky. Suddenly, a wild ${animal} appeared and joined their joyful gathering.`;
  res.send(`
      <h1>Submission Successful</h1>
      <p>${madLib}</p>
      <a href="/ITC505/lab-7">Go Back to Form</a>
  `);
});

// Set the port and start listening
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}
server.listen(port, () => console.log(`Ready on http://localhost:${port}`));