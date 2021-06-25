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

app.get('/authorWithArticles/:name', (req, res) => {
  const { name } = req.params;
  fs.readFile('./data_authors.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Failed to load the data.');
    } else {
      const jsonList = JSON.parse(data);
      const authorObject = jsonList.items.find(
        (author) => author.fields.name.toLowerCase() === name.toLowerCase()
      );
      if (!authorObject) {
        return res.status(404).send('Author not found');
      }
      fs.readFile('./data_articles.json', 'utf-8', (errArt, dataArt) => {
        if (errArt) {
          return res.status(500).send('Failed to load the data.');
        } else {
          const jsonArticles = JSON.parse(dataArt);
          const authorArticles = jsonArticles.items.filter(
            (article) => article.fields.author === authorObject.id
          );
          res.send({
            author: authorObject,
            articles: authorArticles,
          });
        }
      });
    }
  });
});

app.get('/articles', (req, res) => {
  fs.readFile('./data_articles.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Failed to load the data.');
    }
    const articleObject = JSON.parse(data);
    fs.readFile('./data_authors.json', 'utf-8', (errAut, dataAut) => {
      if (errAut) {
        return res.status(500).send('Failed to load the data.');
      }
      articleObject.items.forEach((article) => {
        const authorObject = JSON.parse(dataAut).items.find(
          (author) => author.id === article.author
        );
        // console.log(authorObject);
        article.author = authorObject;
      });
      res.send(articleObject);
    });
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`We are listening to you on port ${PORT}`);
});

// articles.items.forEach(article => {
// 	let authorId = article.fields.author;
// 	const authorObject = authors.items.find(author => author.id === authorId);
// 	article.fields.author = authorObject;
// })
