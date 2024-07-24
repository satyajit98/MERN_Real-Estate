const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const errorHandler = require("../utils/error");

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  //validator
  if (!validator.isEmail(email)) {
    throw Error("Enter a valid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  //salting and hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    //add to db
    const user = await User.create({ username, email, password: hash });
    res.status(200).json({ user });
  } catch (error) {
    next(errorHandler(505, "error from this function"));
  }
};

module.exports = { signUp };
