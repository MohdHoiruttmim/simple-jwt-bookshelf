const router = require('express').Router();
const Book = require('../models/book');
const verify = require('./auth/auth');

router.get('/', verify, async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

module.exports = router;
