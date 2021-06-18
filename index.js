const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to load the data.');
    } else {
      res.send(data);
    }
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`We are listening to you on port ${PORT}`);
});
