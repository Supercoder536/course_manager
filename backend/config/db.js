const mongoose = require("mongoose");
const connecttoDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB is connected on ${conn.connection.host}`);
};
module.exports = connecttoDB;
