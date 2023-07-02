const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: {
    type: String,
  },
  jwt: String,
});

module.exports = mongoose.model("User", userSchema);
