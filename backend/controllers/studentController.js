const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const studentSchema = require("../models/studentSchema.js");
//@desc     Register Student
//@route    POST /api/students
//@access   Public
const registerStudent = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    res.status(404);
    throw new Error("Invalid Request");
  }
  const userexsists = await studentSchema.findOne({ email });
  if (userexsists !== null) {
    res.status(404);
    throw new Error("User already exsists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const newuser = await studentSchema.create({
    name,
    email,
    password: hashedpassword,
  });
  res.status(200).json(newuser);
});

//@desc     Login Student
//@route    POST /api/students/login
//@access   Public
const loginStudent = asynchandler(async (req, res) => {
  res.status(200).json({ message: "Login Student" });
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
