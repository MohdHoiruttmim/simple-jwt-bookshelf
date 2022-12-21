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
        fname: fname,
        lname: lname,
        email: email,
        password: hashedPassword,
        date: Date.now(),
      });

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (!user){
    return res.status(400).json({ message: 'Email or password is incorrect' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword) return res.status(400).json({ message: 'Email or password is incorrect' });

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token)
     .json({message: 'User logged in successfully', token: token});
  // res.status(200).json({ message: 'User logged in successfully' });
};

module.exports = {
  registerUser,
  loginUser,
}