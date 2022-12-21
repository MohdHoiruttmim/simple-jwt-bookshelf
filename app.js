var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');

var app = express();
const cors = require('cors');

const connect = require('./config/config');
require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const testConenction = async () => {
  try {
    await connect.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}; 
testConenction();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

const User = require('./models/user');
app.get('/user/:id', async (req, res) => {  
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
