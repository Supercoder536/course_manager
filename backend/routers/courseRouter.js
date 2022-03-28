const express = require("express");
const {
  getCourses,
  updateCourse,
  deleteCourse,
  createCourse,
} = require("../controllers/courseController.js");
const router = express.Router();

router.route("/").get(getCourses).post(createCourse);
router.route("/:id").put(updateCourse).delete(deleteCourse);

module.exports = router;
