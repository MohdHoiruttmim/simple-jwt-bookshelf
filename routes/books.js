const router = require('express').Router();
const Book = require('../models/book');

router.get('/', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

module.exports = router;
