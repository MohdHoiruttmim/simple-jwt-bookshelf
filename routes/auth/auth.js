const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  // perlu menambahkan 'auth-token' ke dalam header
  const token = req.header('auth-token'); // digunakan untuk mendapatkan token yang dikirim melalui header

  // menggunakan bearer-token
  if(!token) return res.status(403).json({message: 'Incorrect credential'})
  // const token = req.headers.authorization;
  // const JWTToken = token.split(" ").pop(); // digunakan untuk mendapatkan token yang akan diverif

  // console.log(token);
  if(!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // const verified = jwt.verify(JWTToken, process.env.TOKEN_SECRET);
    
    // verifikasi data user masih ada di database atau tidak
    const user = User.findByPk(verified.id);
    console.log(user);

    // untuk mengirimkan user ke next() agar bisa dipakai pada proses selanjutnya
    req.user = user;
    // console.log(verified);
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = verify;