const express = require('express');
const app = express();
app.use(express.json());
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

app.get('/wiki', (req, res) => {
  fs.readFile('./data_wiki.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to load the data.');
    } else {
      res.send(data);
    }
  });
});

app.get('/wiki/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('./data_wiki.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to load the data.');
    } else {
      console.log(data.items);
      const wikiEntry = JSON.parse(data).items.find(
        (item) => item.fields.id === id
      );
      console.log(wikiEntry);
      res.send(wikiEntry);
    }
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`We are listening to you on port ${PORT}`);
});
