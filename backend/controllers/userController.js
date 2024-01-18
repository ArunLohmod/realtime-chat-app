const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      error: "Please enter all the fileds",
    });
    throw new Error("Please enter all the Fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({
      error: "User is already registered",
    });
    throw new Error("User is already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).json({
      error: "Some error occured",
    });
    throw new Error("Some error occured");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Please enter all the fileds",
    });
    throw new Error("Please enter all the Fields");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).json({
      error: "Invalid Email or Password",
    });
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, loginUser };
