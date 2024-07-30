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
//SignIn
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //find user
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return next(errorHandler(404, "User not found"));
    }
    //compare password
    const user = await bcrypt.compare(password, isUser.password);
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
//GoogleAuth
const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      //create token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "3d" }
      );
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = await User.create({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        photo: req.body.photo,
      });
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.SECRET,
        { expiresIn: "3d" }
      );
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, google };
