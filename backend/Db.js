const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/JobPortal")
    .then(() =>
      console.log("Connected successfully to MongoDB server:JobPortal")
    )
    .catch(() => console.log("Error in connecting MongoDB server:JobPortal"));
};

module.exports = connectToDB;
