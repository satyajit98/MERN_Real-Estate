const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

//create token
const createToken = (_id, username, email) => {
  return jwt.sign({ _id, username, email }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

//Signup
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
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //find user
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return next(errorHandler(404, "User not found"));
    }
    //compare password
    const user = bcrypt.compare(password, isUser.password);
    if (!user) {
      return next(errorHandler(401, "Wrong credentials!"));
    }
    //token create
    const token = createToken(isUser._id, isUser.username, isUser.email);

    //hiding password
    const { password: pass, ...rest } = isUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn };
