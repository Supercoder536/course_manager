const mongoose = require("mongoose");
const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    users: { type: [mongoose.Schema.Types.ObjectId], ref: "Student" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
