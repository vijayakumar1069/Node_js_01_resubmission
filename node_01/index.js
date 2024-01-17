const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const folderPath = path.join(__dirname, 'files');

// Create a text file with current timestamp
app.post('/createFile', (req, res) => {
  const timestamp = new Date().toISOString();
  const fileName = `${timestamp.replace(/[:.]/g, '-')}.txt`;
  const filePath = path.join(folderPath, fileName);
  const fileContent = `File created at: ${timestamp}`;

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error creating file');
    }
    res.status(201).send(`File created: ${fileName}`);
  });
});

// Retrieve all text files in the folder
app.get('/getAllFiles', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving files');
    }
    const textFiles = files.filter(file => file.endsWith('.txt'));
    res.json({ files: textFiles });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
