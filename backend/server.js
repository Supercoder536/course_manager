const express = require("express");
const dotenv = require("dotenv").config();
const connecttoDB = require("./config/db.js");
const courseRouter = require("./routers/courseRouter.js");
const port = process.env.PORT || 5000;

const app = express();
connecttoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/courses", courseRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
