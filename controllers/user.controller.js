const User = require("../models/User.model");

const jwt = require("jsonwebtoken");
const config = require("../config/index");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  let payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, config.JWT_SECRET);
};

const verifyToken = (token) => {
  let payload = jwt.verify(token, config.JWT_SECRET);

  return payload;
};

async function registerUser(name, email, password) {
  const alreadyExisting = await User.findOne({
    email,
  });

  if (alreadyExisting) {
    throw new Error("User already exists");
  }

  let user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password),
  });

  user = user.toJSON();
  delete user.password; //we dont want to show the password for security reasons

  return user;
}

async function loginUser(email, password) {
  let user = await User.findOne({
    email,
  });

  if (user) {
    user = user.toJSON();

    if (bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return {
        token: generateToken(user),
        user,
      };
    } else {
      throw new Error("Password does not match");
    }
  } else {
    throw new Error("User does not exist");
  }
}

async function getUserById(id) {
  let user = await User.findById(id);

  user = user.toJSON();

  delete user.password;

  return user;
}

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  getUserById,
};