const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
    required: true,
    min: 3,
    max: 20,
  },
  lastname: {
    type: String,
    default: null,
    min: 1,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
