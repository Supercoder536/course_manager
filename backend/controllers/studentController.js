const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const studentSchema = require("../models/studentSchema.js");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET);
};
//@desc     Register Student
//@route    POST /api/students
//@access   Public
const registerStudent = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    res.status(401);
    throw new Error("Invalid Request");
  }
  const userexsists = await studentSchema.findOne({ email });
  if (userexsists !== null) {
    res.status(401);
    throw new Error("User already exsists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const newuser = await studentSchema.create({
    name,
    email,
    password: hashedpassword,
  });
  const token = createToken({ id: newuser._id.toString() });
  res.status(200).json({ user: newuser, token });
});

//@desc     Login Student
//@route    POST /api/students/login
//@access   Public
const loginStudent = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401);
    throw new Error("Invalid Request");
  }
  const user = await studentSchema.findOne({ email });
  if (user === null) {
    res.status(401);
    throw new Error("No such user exsists");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Password does not match");
  }
  const token = createToken({ id: user._id.toString() });
  res.status(200).json({
    user: { id: user._id, name: user.name, email: user.email },
    token: token,
  });
});

//@desc     Get Student Data
//@route    GET /api/students/me
//@access   Private
const getMe = asynchandler(async (req, res) => {
  res.status(200).json({ message: "Get Student Data" });
});

module.exports = {
  registerStudent,
  loginStudent,
  getMe,
};
