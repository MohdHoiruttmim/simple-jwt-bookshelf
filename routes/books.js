const router = require('express').Router();
const { getAllBooks } = require('../controllers/booksController');

router.get('/', getAllBooks);

module.exports = router;
