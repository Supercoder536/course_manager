const express = require("express");
const {
  registerStudent,
  loginStudent,
  getMe,
} = require("../controllers/studentController.js");
const router = express.Router();

router.post("/", registerStudent);
router.post("/login", loginStudent);
router.get("/me", getMe);

module.exports = router;
