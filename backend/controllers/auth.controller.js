const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  //validator
  if (!validator.isEmail(email)) {
    res.status(401).json({ message: "Enter a valid Email" });
  }

  if (!validator.isStrongPassword(password)) {
    res.status(401).json({ message: "Password is not strong enough" });
  }

  //salting and hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    //add to db
    const user = await User.create({ username, email, password: hash });
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

module.exports = { signUp };
