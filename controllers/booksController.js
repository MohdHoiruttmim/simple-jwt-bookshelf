const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  // console.log(req.user); // user data hanya bisa ditangkap pada level sebelumnya
  const books = await Book.findAll();
  res.json({
    message: "succcess",
    books,
  });
};

module.exports = {
  getAllBooks,
}