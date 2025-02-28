const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;
mongoose.connect('mongodb://127.0.0.1/BookShop')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect sop sop', err));
app.use(express.json());
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);

app.post('/books', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book); // new is created
});

app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.get('/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' }); //error
    res.json(book);
});

app.put('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
});

app.delete('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
