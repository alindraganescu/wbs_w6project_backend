const express = require('express');
const app = express();
app.use(express.json()); //to be able to work with data
const fs = require('fs');
const cors = require('cors'); //to avoid security problems between browser and back-end
app.use(cors());

app.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    //if the root is requested the data is sent
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

app.get('/author', (req, res) => {
  fs.readFile('./data_authors.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to load the data.');
    } else {
      res.send(data);
    }
  });
});

app.get('/author/:id', (req, res) => {
  fs.readFile('./data_authors.json', 'utf-8', (err, data) => {
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
