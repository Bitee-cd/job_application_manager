const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@public route
//@POST /api/users/register
//@desc register new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error(`Provide all required fields`);
  }
  const availableuser = await User.findOne({ email });
  if (availableuser) {
    res.status(401);
    throw new Error("user already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ password: hashedPassword, email, username });
  if (user) {
    res.status(201).json({ email: user.email, _id: user.id });
  } else {
    res.status(400);
    throw new Error("User data invalid");
  }
});

//@public route
//@POST /api/users/login
//@desc login existing user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    res.status(400);
    throw new Error(`Provide all required fields`);
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: { username: user.username, email: user.email, id: user.id },
      },
      process.env.MY_SECRET_KEY,
      { expiresIn: "10m" }
    );
    if (accessToken) {
      res.status(200).json({ accessToken });
    }
  } else {
    res.status(401);
    throw new Error("Invalid login credentials");
  }
});

//@public route
//@GET /api/users/current
//@desc get current user
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
