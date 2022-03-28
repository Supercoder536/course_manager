const asynchandler = require("express-async-handler");
const courseSchema = require("../models/courseSchema.js");

const getCourses = asynchandler(async (req, res) => {
  const courses = await courseSchema.find();
  res.status(200).json(courses);
});

const createCourse = asynchandler(async (req, res) => {
  if (!req.body.title) {
    res.status(401);
    throw new Error("Please add a title");
  }

  const course = await courseSchema.create({ name: req.body.title });
  res.status(200).json(course);
});

const updateCourse = asynchandler(async (req, res) => {
  const course = await courseSchema.findById(req.params.id);
  if (!course) {
    res.status(401);
    throw new Error("Invalid ID");
  }

  const updatedcourse = await courseSchema.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(updatedcourse);
});

const deleteCourse = asynchandler(async (req, res) => {
  const course = await courseSchema.findById(req.params.id);
  if (!course) {
    res.status(401);
    throw new Error("Invalid ID");
  }

  const deletedcourse = await courseSchema.findByIdAndDelete(
    req.params.id,
    req.body
  );
  res.status(200).json(deletedcourse);
});

module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
