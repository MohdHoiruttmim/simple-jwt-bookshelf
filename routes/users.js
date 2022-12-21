var express = require('express');
var router = express.Router();
const { 
        registerUser, 
        loginUser,
      } = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('USER ROUTE API');
});

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
