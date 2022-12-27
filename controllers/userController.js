const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const isUsedEmail = await User.findOne({where: { email: email }});

  if (isUsedEmail !== null) {
    return res.status(400).json({ message: 'Email already exists' });
  };
  // console.log(isUsedEmail);
  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        fname,
        lname,
        email,
        password: hashedPassword,
        refresh_token: '',
        date: Date.now(),
      });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ 
    where: { email: email }, 
  });

  if (!user){
    return res.status(400).json({ message: 'Email or password is incorrect' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword) return res.status(400).json({ message: 'Email or password is incorrect' });

  // hanya mengirimkan id user saja
  // const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET) ;

  // mengirimkan semua data user kecuali password
  const { id, fname, lname, refresh_token } = user;
  const accessToken = jwt.sign({ id, fname, lname, email, refresh_token }, process.env.TOKEN_SECRET, { expiresIn: '30s' });
  const refreshToken = jwt.sign({ id, fname, lname, email, refresh_token }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  user.refresh_token = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, { 
    httpOnly: true, 
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.header('auth-token', accessToken)
     .json({message: 'User logged in successfully',refreshToken});
  // res.status(200).json({ message: 'User logged in successfully' });
};

module.exports = {
  registerUser,
  loginUser,
}