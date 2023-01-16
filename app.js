require("dotenv").config();
const User = require("./model/user");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ineuron</h1>");
});

app.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!(email && firstname && lastname && password)) {
    res.status(400).send("PLease enter all the mandatory fields");
  }

  const existinguser = await User.findOne(email);
  if (existinguser) {
    res.status(400).send("mail already exists");
  }
});

module.exports = app;
