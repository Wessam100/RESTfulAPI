const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

const data = [
    { id: 1, name: 'The Vampire diaries' },
    { id: 2, name: 'The Originals' },
    { id: 3, name: 'Save Me' },
    { id: 4, name: 'For My Family' },
    { id: 5, name: 'Sen Anlat Kara Deniz' },
    { id: 6, name: 'Dui Beni' },
  ];

  app.use(express.json());


app.post('/books', (req, res) => {
   const { id, name } = req.body;
    if (data.some(book => book.id === id)) { //to make sure id is unique
      return res.status(400).json({ error: 'ID already exists' });
    }
  const newBook = { id, name }; //if unique add 
  data.push(newBook);
  res.status(201).json(newBook);
});


app.get('/books', (req, res) => {
  res.json(data);
});


app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = data.find((book) => book.id === id);
  if (!book) {
    res.status(404).json({ error: 'book not found' });
  } else {
    res.json(book);
  }
});


app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBook = req.body;
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'book not found' });
  } else {
    data[index] = { ...data[index], ...updatedBook };
    res.json(data[index]);
  }
});


app.delete('/books/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const index = data.findIndex((item) => item.id === id);
      if (index === -1) {
        res.status(404).json({ error: 'book not found' });
      } else {
        const deletedBook = data.splice(index, 1);
        res.json(deletedBook[0]);
      }
});

